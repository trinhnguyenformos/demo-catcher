package dorg.catcher

import grails.gorm.transactions.Transactional

import org.apache.commons.codec.digest.DigestUtils
import org.apache.commons.collections.CollectionUtils
import org.apache.commons.collections.MapUtils

import java.nio.charset.StandardCharsets

import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.ArrayList
import java.util.Arrays
import java.util.Collections
import java.util.Date
import java.util.Enumeration
import java.util.HashMap
import java.util.HashSet
import java.util.List
import java.util.Map
import java.util.Properties
import java.util.Set
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit
import java.util.regex.Matcher
import java.util.regex.Pattern

import javax.mail.FetchProfile
import javax.mail.Folder
import javax.mail.FolderClosedException
import javax.mail.Header
import javax.mail.Message
import javax.mail.MessagingException
import javax.mail.Multipart
import javax.mail.Part
import javax.mail.Session
import javax.mail.Store
import javax.mail.internet.MimeBodyPart
import javax.mail.internet.MimeMessage
import javax.mail.internet.MimeUtility

import org.slf4j.Logger
import org.slf4j.LoggerFactory

import com.google.common.collect.Lists
import com.google.common.io.ByteStreams
import com.sun.mail.imap.IMAPMessage
import com.vdurmont.emoji.EmojiParser;

@Transactional
class CatcherEmailProcessService {

	Logger logger = LoggerFactory.getLogger(CatcherEmailProcessService.class)
	
	private static final long MAX_HOUR_WAITING_PROCESS_EXECUTE = 12
	private static final long MAX_DAY_WAITING_PROCESS_EXECUTE_ALL = 4
	private static final int MAX_MAIL_FETCH = 300
	private static final int REFRESH_FOLDER_INTERVAL_BY_CHUNK = 5

	private static final String PLAIN_TEXT_BEGIN = "##### plain text content begin #####"
	private static final String PLAIN_TEXT_END = "##### plain text content end #####"
	private static final String HTML_CONTENT_BEGIN = "##### html content begin #####"
	private static final String HTML_CONTENT_END = "##### html content end #####"
	private static final String MAIL_SOURCE_NEW_LINE = "\r\n--"
	private static final String AT_SYMBOL = "@"
	private static final String NUMBER_SYMBOL = "-#-"
	private static final String EMAIL_PATTERN = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}"
	private static final String EMAIL_PATTERN_MISSING_ACCOUNT_NAME = "@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}"
	private static final String IPADDRESS_PATTERN = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"
	private static final String HOSTNAME_PATTERN = "[a-zA-Z0-9\\-\\.]+\\.(com|org|net|mil|edu|(co\\.[a-zA-Z].))"
	private static final String API_TRUE = "T"
	private static final String RSMITH_STRING = "rsmith"
	private static final String RSMITH_PATTERN_STRING = RSMITH_STRING + "([0-9]+)"

	private static final String EMAIL_RECEIVED_DATE_KEY = "receivedDate"
	private static final String EMAIL_SENT_DATE_KEY = "sentDate"
	private static final String EMAIL_MESSAGE_NUMBER_KEY = "messageNumber"
	private static final String EMAIL_HEADER_EMAILS_KEY = "headerEmails"
	private static final String EMAIL_RECEIVES_KEY = "receives"
	private static final String EMAIL_RECEIVED_KEY = "Received"
	private static final String EMAIL_FROM_KEY = "from"
	private static final String EMAIL_TO_KEY = "to"
	private static final String EMAIL_SUBJECT_KEY = "subject"
	private static final String EMAIL_DATE_KEY = "Date"
	private static final String EMAIL_MESSAGE_ID_KEY = "Message-ID"
	private static final String EMAIL_STRDATE_KEY = "strDate"
	private static final String EMAIL_MESSAGEID_KEY = "messageId"
	private static final String PLAIN_TEXT = "text/plain"
	private static final String PLAIN_HTML = "text/html"

	private static final String REQUEST_USER_AGENT = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0"
	
	public static final String PROTOCOL_KEY = "mail.store.protocol"
	public static final String SSL_ENABLE_KEY = "mail.imap.ssl.enable"
	public static final String IMAP_PARTIAL_FETCH = "mail.imap.partialfetch"
	public static final String IMAP_CONNECTION_POOL_SIZE = "mail.imap.connectionpoolsize"
	public static final String IMAP_CONNECTION_POOL_TIMEOUT = "mail.imap.connectionpooltimeout"
	public static final String IMAP_PROTOCOL = "imap"
	public static final String INBOX_FOLDER = "INBOX"
	
    def serviceMethod() {

    }
	
	List<Email> processMailboxByEmailSource(EmailSource emailSource, boolean isAll) {
		try {
			List<Email> messageNumbersForMoving = new ArrayList<>()
			Store store = null
			Properties props = System.getProperties()
			props.setProperty(PROTOCOL_KEY, IMAP_PROTOCOL)
			props.setProperty(IMAP_PARTIAL_FETCH, "false")
			props.setProperty(IMAP_CONNECTION_POOL_SIZE, "4")
			props.setProperty(IMAP_CONNECTION_POOL_TIMEOUT, "120000")

			Session session = Session.getDefaultInstance(props, null)

			try {
				store = session.getStore(IMAP_PROTOCOL)
				store.connect(emailSource.getMailHost(), emailSource.getAccountUsername(), emailSource.getAccountPassword())
				Folder[] folders
				if (isAll) {
					folders = store.getDefaultFolder().list("*")
				} else {
					folders = store.getDefaultFolder().list(INBOX_FOLDER)
				}
				if (folders != null) {
					messageNumbersForMoving = processFolders(emailSource, folders, store)
				}
				logger.info("INFO_CATCHER - Done reading email source: {}.", emailSource.getId())
			} catch (Exception ex) {
				logger.error("ERROR_CATCHER - Failed to read mailbox: ", ex)
			} finally {
				if (store != null) {
					store.close()
				}
			}
			
			logger.info("INFO_CATCHER - Email source {}: The number of messages moving: {}. Starting to move emails....", emailSource.getId(), messageNumbersForMoving.size())
			
			if (CollectionUtils.isEmpty(messageNumbersForMoving)) {
				logger.info("INFO_CATCHER - Email source {}: No messages for moving!!!", emailSource.getId())
			} else {
				//catcherMoveEmailProcessService.moveCatcherEmailByEmailSource(emailSource, messageNumbersForMoving, catcherConfigProps.isCatcherMoveMailEmulator())
			}
			logger.info("INFO_CATCHER - Done processing email source: {}", emailSource.getId())
		} catch (Exception e) {
			logger.error("ERROR_CATCHER - Failed to process email source: {}", emailSource.getId(), e)
		}
	}
	
	private List<Email> processFolders(EmailSource emailSource, Folder[] folders, Store store) {
		List<Email> messageNumbersForMoving = new ArrayList<>()

		for (Folder folder : folders) {
			try {
				if (Thread.interrupted()) {
					logger.error("ERROR_CATCHER - Email source: {}. The current thread is timeout and must terminate !!!", emailSource.getId())
					return messageNumbersForMoving
				}
				if (!isValidFolder(folder)) {
					continue
				}
				logger.info("INFO_CATCHER - Starting to read folder: {} in email source {}", folder.getFullName(), emailSource.getId())

				folder.open(Folder.READ_ONLY)

				Message[] messages = getMessages(folder)

				if (messages == null || messages.length == 0) {
					logger.info("INFO_CATCHER - Folder '{}' is empty in email source {}", folder.getFullName(), emailSource.getId())
					continue
				}

				List<Integer> messageNumbers = new ArrayList<>()
				for (int i = 0; i < messages.length; i++) {
					messageNumbers.add(messages[i].getMessageNumber())
				}

				messageNumbersForMoving = readMessages(messageNumbers, folder, emailSource, messageNumbersForMoving, store)

				logger.info("INFO_CATCHER - Done reading folder: {} in email source {}", folder.getFullName(), emailSource.getId())
			} catch (Exception ex) {
				logger.error("ERROR_CATCHER - Failed to open folder: {}.", folder.getFullName(), ex)
				continue
			} finally {
				closeFolder(folder)
			}
		}

		return messageNumbersForMoving
	}
	
	private List<Email> readMessages(List<Integer> messageNumbers, Folder folder, EmailSource emailSource, List<Email> messageNumbersForMoving, Store store) throws MessagingException {
		
		String folderName = folder.getFullName()
		
		List<List<Integer>> messageChunks = Lists.partition(messageNumbers, MAX_MAIL_FETCH)
		if (CollectionUtils.isEmpty(messageChunks)) {
			logger.error("ERROR_CATCHER - readMessages: {} - messageChunks is empty!!! return.", folderName)
			return messageNumbersForMoving
		}
		
		Integer messagesProcessed = 0
		for (int index = 0; index < messageChunks.size(); index++) {
			List<Integer> chunk = messageChunks.get(index)
			int[] messageNumbersArray = chunk.stream().mapToInt{i -> i}.toArray()
			if (index % REFRESH_FOLDER_INTERVAL_BY_CHUNK == 0) {
				folder = refreshFolder(folder, store)
			}

			openFolderIfClosed(folder)
			Message[] chunkMessages = folder.getMessages(messageNumbersArray)

			if (chunkMessages == null) {
				continue
			}
			if (fetchMessages(folder, chunkMessages)) {
				messagesProcessed += processMessages(emailSource, folderName, chunkMessages, messageNumbersForMoving)
			}

			logger.info("INFO_CATCHER - Email source: {}. Folder: {}. Total messages processed: {}", emailSource.getId(), folderName, messagesProcessed)
		}
		return messageNumbersForMoving
	}
	
	private boolean isValidFolder(Folder folder) throws MessagingException {
		return (!"Bulk Mail".equalsIgnoreCase(folder.getFullName()) &&
				!"Drafts".equalsIgnoreCase(folder.getFullName()) &&
				!"Email_Templates".equalsIgnoreCase(folder.getFullName()) &&
				!"Send_Later".equalsIgnoreCase(folder.getFullName()) &&
				!"Sent Items".equalsIgnoreCase(folder.getFullName()) &&
				!"Trash".equalsIgnoreCase(folder.getFullName())) &&
				(folder.getType() & javax.mail.Folder.HOLDS_MESSAGES) != 0
	}
	
	private void openFolderIfClosed(Folder folder) throws MessagingException {
		if (!folder.isOpen()) {
			folder.open(Folder.READ_ONLY)
		}
	}
	
	private Folder refreshFolder(Folder folder, Store store) throws MessagingException {
		String folderName = folder.getFullName()
		closeFolder(folder)
		folder = store.getFolder(folderName)
		folder.open(Folder.READ_ONLY)
		return folder
	}
	
	private void closeFolder(Folder folder) {
		if (folder != null && folder.isOpen()) {
			try {
				folder.close(false)
			} catch (MessagingException e) {
				logger.error("ERROR_CATCHER - Failed to close folder: {}", folder.getFullName(), e)
			}
		}
	}
	
	private boolean fetchMessages(Folder folder, Message[] chunkMessages) {
		try {
			FetchProfile fp = new FetchProfile()
			fp.add(FetchProfile.Item.ENVELOPE)
			fp.add(FetchProfile.Item.FLAGS)
			fp.add(FetchProfile.Item.CONTENT_INFO)
			//fp.add(IMAPFolder.FetchProfileItem.MESSAGE)
			openFolderIfClosed(folder)
			folder.fetch(chunkMessages, fp)
			return true
		} catch (MessagingException e) {
			logger.error("ERROR_CATCHER - Failed to fetch emails on folder: {}.", folder.getFullName(), e)
			return false
		}
	}
	
	private Message[] getMessages(Folder folder) throws MessagingException {
		Message[] messages = folder.getMessages()
		// TODO
		//Arrays.sort( messages, (m1, m2) -> m1.getMessageNumber() < m2.getMessageNumber() ? -1 : (m1.getMessageNumber() == m2.getMessageNumber() ? 0 : 1) )
		return messages
	}
	
	private List<Email> processMessages(EmailSource emailSource, String folderName, Message[] chunkMessages, List<Email> messageNumbersForMoving) {
		int messagesProcessed = 0
		boolean isInboxFolder = INBOX_FOLDER.equalsIgnoreCase(folderName)

		for (int i = 0; i < chunkMessages.length; ++i) {
			try {
				Message msg = chunkMessages[i]
				Map<String, Object> messageContent = parseMessageContent(msg)
				if (MapUtils.isEmpty(messageContent)) {
					continue
				}

				List<String> receives = (List<String>) messageContent.get(EMAIL_RECEIVES_KEY)
				Set<String> headerEmails = (Set<String>) messageContent.get(EMAIL_HEADER_EMAILS_KEY)
				String from = (String) messageContent.get(EMAIL_FROM_KEY)
				String to = (String) messageContent.get(EMAIL_TO_KEY)
				String subject = (String) messageContent.get(EMAIL_SUBJECT_KEY)
				String messageId = (String) messageContent.get(EMAIL_MESSAGEID_KEY)
				int messageNumber = (int) messageContent.get(EMAIL_MESSAGE_NUMBER_KEY)

				Set<String> toEmails = getEmailAddresses(to)
				String senderName = ""
				String senderDomain = ""

				String senderEmail = parseEmailAddressToGetSenderInfo(from)
				if (senderEmail != null) {
					senderName = senderEmail.substring(0, senderEmail.indexOf(AT_SYMBOL))
					senderDomain = senderEmail.substring(senderEmail.indexOf(AT_SYMBOL)+1)
				}

				//if (StringUtils.isEmpty(senderDomain)) {
				if (senderDomain == null || senderDomain == "") {
					continue
				}

				Email mail = new Email()
				mail.setSubject(EmojiParser.removeAllEmojis(subject))
				mail.setFromAddress(from)
				mail.setToAddress(to)
				mail.setReceivedDate(getReceivedDate(messageContent))
				mail.setSentDate((Date) messageContent.get(EMAIL_SENT_DATE_KEY))
				mail.setFolder(folderName)
				mail.setSenderName(senderName)
//				mail.setSourceAccount(emailSource.getAccountUsername())
				mail.setEmailSourceId(emailSource.getId())
//				mail.setMessageIdHash(StringUtils.isNotEmpty(messageId) ? DigestUtils.sha512Hex(messageId) : null)
//
//				List<String> listSourceIps = new ArrayList<>()
//				String sourceIps = getSourceIps(receives, listSourceIps)
//				mail.setSourceIps(sourceIps)
//
//				List<String> marketoIps = catcherEmailService.retrieveMarketoIpListByDomain("%@" + senderDomain)
//				List<String> listMarketoIps = new ArrayList<>()
//				String strMarketoIp = getMarketoIps(marketoIps, listMarketoIps)
//
//				Domain domain = new Domain()
//				domain.setInvestigationStatus(InvestigationStatus.NEW.byteValue())
//				domain.setCompanyDomain(senderDomain)
//				domain.setEmailSourceIps(sourceIps)
//				domain.setEmailSourceIpsList(receives)
//				domain.setMarketoIps(strMarketoIp)
//				domain.setMarketoIpsList(marketoIps)
//				domain.setCompanyWebDomain(senderDomain)

				Set<String> plantEmails = getPlantEmails(emailSource, toEmails, headerEmails, from, to)
//				CatcherAccountInfo catcherAccountInfo = getCatcherAccountInfo(senderEmail, senderDomain, emailSource, plantEmails)

//				updateDomain(domain, catcherAccountInfo)
//				updateEmail(mail, catcherAccountInfo)
//				domain.setEmail(mail)
//				domain = saveDomainSynchronous(domain)
//				mail.setDomainId(domain.getId())
//				setEmailDetails(mail, msg, receives)
				
				messagesProcessed ++
				if (isInboxFolder) {
					//messageNumbersForMoving.add(messageNumber)
					messageNumbersForMoving.add(mail)
				}
				((IMAPMessage) msg).invalidateHeaders()
			} catch (Exception e) {
				logger.error("ERROR_CATCHER - Failed to process email at folder {}.", folderName, e)
			}
		}
		//return messagesProcessed
		return messageNumbersForMoving
	}
	
	private Map<String, Object> parseMessageContent(Message msg) throws MessagingException {
		Map<String, Object> dataMap = new HashMap<>()

		try {
			Enumeration headers = msg.getAllHeaders()
			dataMap.put(EMAIL_RECEIVED_DATE_KEY, msg.getReceivedDate())
			dataMap.put(EMAIL_SENT_DATE_KEY, msg.getSentDate())
			dataMap.put(EMAIL_MESSAGE_NUMBER_KEY, msg.getMessageNumber())

			List<String> receives = new ArrayList<>()
			Set<String> headerEmails = new HashSet<>()
			String from = ""
			String to = ""
			String subject = ""
			String strDate = ""
			String messageId = ""

			while (headers.hasMoreElements()) {
				Header h = (Header) headers.nextElement()
				if (!EMAIL_FROM_KEY.equalsIgnoreCase(h.getName()) && !EMAIL_TO_KEY.equalsIgnoreCase(h.getName())) {
					Set<String> emails = getEmailAddresses(h.getValue())
					if (CollectionUtils.isNotEmpty(emails)) {
						headerEmails.addAll(emails)
					}
				}
				if (EMAIL_RECEIVED_KEY.equalsIgnoreCase(h.getName()) && getIpAddress(h.getValue()) != null) {
					String receive = getIpAddress(h.getValue()) + NUMBER_SYMBOL + getMachineAddress(h.getValue())
					if (!receives.contains(receive)) {
						receives.add(receive)
					}
				} else if (EMAIL_FROM_KEY.equalsIgnoreCase(h.getName())) {
					from = decodeText(h.getValue())
				} else if (EMAIL_TO_KEY.equalsIgnoreCase(h.getName())) {
					to = decodeText(h.getValue())
				} else if (EMAIL_SUBJECT_KEY.equalsIgnoreCase(h.getName())) {
					subject = decodeText(h.getValue())
				} else if (EMAIL_DATE_KEY.equalsIgnoreCase(h.getName())) {
					strDate = h.getValue()
				} else if (EMAIL_MESSAGE_ID_KEY.equalsIgnoreCase(h.getName())) {
					messageId = h.getValue()
				}
			}

			dataMap.put(EMAIL_HEADER_EMAILS_KEY, headerEmails)
			dataMap.put(EMAIL_RECEIVES_KEY, receives)
			dataMap.put(EMAIL_FROM_KEY, from)
			dataMap.put(EMAIL_TO_KEY, to)
			dataMap.put(EMAIL_SUBJECT_KEY, subject)
			dataMap.put(EMAIL_STRDATE_KEY, strDate)
			dataMap.put(EMAIL_MESSAGEID_KEY, messageId)
		} catch (FolderClosedException fce) {
			logger.error("ERROR_CATCHER - FolderClosedException. Message number: {}. Failed to read email header.", msg.getMessageNumber(), fce)
			openFolderIfClosed(msg.getFolder())
			return new HashMap<>()
		} catch (Exception e) {
			logger.error("ERROR_CATCHER - Message number: {}. Failed to read email header.", msg.getMessageNumber(), e)
			return new HashMap<>()
		}
		return dataMap
	}
	
	private String getText(Part p, Message msg) throws MessagingException, IOException {
		try {
			if (p.isMimeType(PLAIN_TEXT)) {
				return PLAIN_TEXT_BEGIN + parseMessageContentPart(p, msg) + PLAIN_TEXT_END
			} else if (p.isMimeType(PLAIN_HTML)) {
				return  HTML_CONTENT_BEGIN + parseMessageContentPart(p, msg) + HTML_CONTENT_END
			} else if (p.isMimeType("multipart/alternative")) {
				Multipart mp = (Multipart) p.getContent()
				String text = null
				for (int i = 0; i < mp.getCount(); i++) {
					Part bp = mp.getBodyPart(i)
					if (bp.isMimeType(PLAIN_TEXT)) {
						if (text == null) {
							text = getText(bp, msg)
						}
						continue
					} else if (bp.isMimeType(PLAIN_HTML)) {
						String s = getText(bp, msg)
						if (s != null) {
							return s
						}
					} else {
						return getText(bp, msg)
					}
				}
				return text
			} else if (p.isMimeType("multipart/*")) {
				Multipart mp = (Multipart) p.getContent()
				for (int i = 0; i < mp.getCount(); i++) {
					MimeBodyPart part = (MimeBodyPart) mp.getBodyPart(i)
					String disp = part.getDisposition()
					if (disp == null || !disp.equalsIgnoreCase(Part.ATTACHMENT)) {
						String s = getText(mp.getBodyPart(i), msg)
						if (s != null) {
							return s
						}
					}
				}
			}
			return ""
		} catch (Exception e) {
			logger.error("ERROR_CATCHER - Failed to parse message content...Treat it as blank value and continue...Error message: {}.", e.toString())
			return ""
		}
	}
	
	private String parseEmailAddressToGetSenderInfo(String str) {
		Pattern pattern = Pattern.compile(EMAIL_PATTERN)
		Matcher matcher = pattern.matcher(str)
		if (matcher.find()) {
			return matcher.group()
		} else {
			//Try one more, just to get domain name
			Pattern missingAccountNamePattern = Pattern.compile(EMAIL_PATTERN_MISSING_ACCOUNT_NAME)
			Matcher missingAccountNameMatcher = missingAccountNamePattern.matcher(str)
			if (missingAccountNameMatcher.find()) {
				return missingAccountNameMatcher.group()
			}  else {
				return null
			}
		}
	}
	
	private Set<String> getEmailAddresses(String str) {
		Pattern pattern = Pattern.compile(EMAIL_PATTERN)
		Matcher matcher = pattern.matcher(str)
		Set<String> list = new HashSet<>()
		int count = 0
		while(matcher.find()) {
			list.add(matcher.group())
			count++
		}
		if (count > 0) {
			return list
		} else {
			return Collections.emptySet()
		}
	}
	
	private String getIpAddress(String str) {
		Pattern pattern = Pattern.compile(IPADDRESS_PATTERN)
		Matcher matcher = pattern.matcher(str)
		if (matcher.find()) {
			return matcher.group()
		} else {
			return null
		}
	}
	
	private String getMachineAddress(String str) {
		Pattern pattern = Pattern.compile(HOSTNAME_PATTERN)
		Matcher matcher = pattern.matcher(str)
		if (matcher.find()) {
			return matcher.group()
		} else {
			return "unknown"
		}
	}
	
	private String parseMessageContentPart(Part p, Message msg) throws MessagingException, IOException {
		Object content = null
		try {
			content = p.getContent()
		} catch (Exception e) {
			logger.warn("WARN_CATCHER - Failed to get content of message {}...Try get InputStream", msg.getSubject())
			content = p.getInputStream()
		}
		if (content instanceof String) {
			return (String) content
		} else if (content instanceof InputStream) {
			return new String(ByteStreams.toByteArray((InputStream) content), StandardCharsets.UTF_8)
		}
		return ""
	}
	
	private String decodeText(String text) {
		String decodeText = ""
		try {
			decodeText = MimeUtility.decodeText(text.replace("\"", ""))
		} catch (UnsupportedEncodingException unsupportedEncodingException) {
			decodeText = text.replace("\"", "")
			logger.warn(unsupportedEncodingException.getMessage())
		}
		return decodeText
	}
	
	private Set<String> getPlantEmails(EmailSource emailSource, Set<String> toEmails, Set<String> headerEmails, String from, String to) {
		String emailSourceDomain = emailSource.getAccountUsername().substring(emailSource.getAccountUsername().indexOf(AT_SYMBOL))
		Set<String> plantEmails = new HashSet<>()
		for (String plantEmail : toEmails) {
			if (plantEmail.contains(emailSourceDomain)) {
				plantEmails.add(plantEmail)
			}
		}
		for (String plantEmail : headerEmails) {
			if (!from.contains(plantEmail) && !to.contains(plantEmail) && plantEmail.contains(emailSourceDomain)) {
				plantEmails.add(plantEmail)
			}
		}
//		if (catcherConfigProps.isCatcherMoveMailEmulator()) {
//			logger.info("INFO_CATCHER - emailSourceDomain: {} - plantEmails: {}", emailSourceDomain, plantEmails)
//		}
		return plantEmails
	}
	
	private Date getReceivedDate(Map<String, Object> messageContent) {
		String strDate = (String) messageContent.get(EMAIL_STRDATE_KEY)
		Date receivedDate = null
		//if (StringUtils.isNotEmpty(strDate)) {
		if (strDate != null && strDate != "") {
			//SimpleDateFormat[] formats = new SimpleDateFormat[] { new SimpleDateFormat("EEEE, dd MMMM yy HH:mm:ss Z"), new SimpleDateFormat("dd MMMM yy HH:mm:ss Z") }
			List<SimpleDateFormat> formats = new ArrayList<>()
			formats.add(new SimpleDateFormat("EEEE, dd MMMM yy HH:mm:ss Z"))
			formats.add(new SimpleDateFormat("dd MMMM yy HH:mm:ss Z"))
			for (int i = 0; i < formats.size(); i++) {
				try {
					receivedDate = formats[i].parse(strDate)
					if (receivedDate != null) {
						return receivedDate
					}
				} catch (ParseException e) {
					logger.error("ERROR_CATCHER: {}", e.toString())
				}
			}
		}

		return (Date) messageContent.get(EMAIL_RECEIVED_DATE_KEY)
	}
}
