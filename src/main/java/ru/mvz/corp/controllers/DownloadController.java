package ru.mvz.corp.controllers;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLConnection;
import java.nio.charset.Charset;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Controller
public class DownloadController {

	private static final Logger logger = LogManager.getLogger(DownloadController.class);

    private static final String INTERNAL_FILE="irregular-verbs-list.pdf";
	private static final String EXTERNAL_FILE_PATH="C:/Users/Bormalev/Documents/Documents.xlsx";
	
	/*
	 * Download a file from 
	 *   - inside project, located in resources folder.
	 *   - outside project, located in File system somewhere. 
	 */
	@RequestMapping(value="/download", method = RequestMethod.GET)
	public void downloadFile(HttpServletResponse response, @ModelAttribute("type") String type) throws IOException {
	
		try {
			logger.info("DownloadController  --- "+ type);
			String errorMessage = null;
		    File file = null;
		
		    if(type.equalsIgnoreCase("internal")){
		    	ClassLoader classloader = Thread.currentThread().getContextClassLoader();
		    	file = new File(classloader.getResource(INTERNAL_FILE).getFile());
		    } else {
		    	file = new File(EXTERNAL_FILE_PATH);
	    	}
		
		    if(!file.exists()){
		    	errorMessage = "Sorry. The file you are looking for does not exist";
			    OutputStream outputStream = response.getOutputStream();
			    outputStream.write(errorMessage.getBytes(Charset.forName("UTF-8")));
			    outputStream.close();
			    return;
		    }
		
		    String mimeType= URLConnection.guessContentTypeFromName(file.getName());
		    if(mimeType==null){
		    	System.out.println("mimetype is not detectable, will take default");
	    		mimeType = "application/octet-stream";
		    }
				
            response.setContentType(mimeType);
        
            /* "Content-Disposition : inline" will show viewable types [like images/text/pdf/anything viewable by browser] right on browser 
                while others(zip e.g) will be directly downloaded [may provide save as popup, based on your browser setting.]*/
            response.setHeader("Content-Disposition", String.format("attachment; filename=\"" + file.getName() +"\""));

        
            /* "Content-Disposition : attachment" will be directly download, may provide save as popup, based on your browser setting*/
            //response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getName()));
            response.setContentLength((int)file.length());

		    InputStream inputStream = new BufferedInputStream(new FileInputStream(file));

            //Copy bytes from source to destination(outputstream in this example), closes both streams.
			FileCopyUtils.copy(inputStream, response.getOutputStream());	
		
		} catch (Exception e) {
			logger.info("DownloadController  --- "+ e.getMessage());
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(e.getMessage().getBytes(Charset.forName("UTF-8")));
			outputStream.close();
			return;
		}		
	}

}
