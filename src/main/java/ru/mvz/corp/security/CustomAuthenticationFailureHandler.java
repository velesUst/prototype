package ru.mvz.corp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by ...
 */
@Component("authenticationFailureHandler")
public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(final HttpServletRequest request, final HttpServletResponse response, final AuthenticationException exception) throws IOException, ServletException {
        setDefaultFailureUrl("/login.html?error=true");

        super.onAuthenticationFailure(request, response, exception);

        String msg = exception.getMessage();
        if (exception.getMessage().equalsIgnoreCase("User is disabled")) {
            msg = "Пользователь отключен. Необходимо активировать учетную запись.";
        } else if (exception.getMessage().equalsIgnoreCase("Bad credentials")) {
            msg = "Неверные учетные данные логин или пароль...";
        } else if (exception.getMessage().indexOf("No user found with username") != -1) {
            msg = "Пользователя с таким логином не существует.";
        }

        request.getSession().setAttribute(WebAttributes.AUTHENTICATION_EXCEPTION, msg);
    }
}
