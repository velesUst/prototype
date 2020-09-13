package ru.mvz.corp.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Base64;
import java.nio.charset.StandardCharsets;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import ru.mvz.corp.persistence.model.Privilege;
import ru.mvz.corp.persistence.model.Role;
import ru.mvz.corp.persistence.model.User;
import ru.mvz.corp.service.UserService;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

/**
 * Created by ...
 */

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger logger = LogManager.getLogger(CustomUserDetailsService.class);

    @Autowired
    UserService userService;
    
   
    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        try {
  /*          
            HttpServletRequest request = 
  ((ServletRequestAttributes) RequestContextHolder.
    currentRequestAttributes()).
    getRequest();
    logger.info(" CustomUserDetailsService - " +request);
    final String authorization = request.getHeader("Authorization");
    logger.info(" CustomUserDetailsService - " +authorization);

    if (authorization != null && authorization.toLowerCase().startsWith("basic")) {
    // Authorization: Basic base64credentials
    String base64Credentials = authorization.substring("Basic".length()).trim();
    byte[] credDecoded = Base64.getDecoder().decode(base64Credentials);
    String credentials = new String(credDecoded, StandardCharsets.UTF_8);
    // credentials = username:password
    final String[] values = credentials.split(":", 2);
    logger.info(" CustomUserDetailsService - " +values[0]);
}*/
            final User user = userService.findByName(login);
            if (user == null) {
                throw new UsernameNotFoundException("No user found with username: " + login);
            }
            Collection<? extends GrantedAuthority> grantedAuthorities = getAuthorities(user.getRoles());
            return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(), user.isEnabled(), true, true, true, grantedAuthorities);
        } catch (final Exception e) {
            throw new RuntimeException(e);
        }
    }

    // UTIL
    private final Collection<? extends GrantedAuthority> getAuthorities(final Collection<Role> roles) {
        return getGrantedAuthorities(getPrivileges(roles));
    }

    private final List<String> getPrivileges(final Collection<Role> roles) {
        final List<String> privileges = new ArrayList<>();
        final List<Privilege> collection = new ArrayList<>();
        for (final Role role : roles) {
            collection.addAll(role.getPrivileges());
        }
        for (final Privilege item : collection) {
            privileges.add(item.getName());
        }

        return privileges;
    }

    private final List<GrantedAuthority> getGrantedAuthorities(final List<String> privileges) {
        final List<GrantedAuthority> authorities = new ArrayList<>();
        for (final String privilege : privileges) {
            authorities.add(new SimpleGrantedAuthority(privilege));
        }
        return authorities;
    }
    
}
