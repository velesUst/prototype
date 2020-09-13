package ru.mvz.corp.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.mvz.corp.persistence.dao.PrivilegeDao;
import ru.mvz.corp.persistence.dao.RoleDao;
import ru.mvz.corp.persistence.dao.UserDao;
import ru.mvz.corp.persistence.model.Privilege;
import ru.mvz.corp.persistence.model.Role;
import ru.mvz.corp.persistence.model.User;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Component
public class SetupDataLoader  implements ApplicationListener<ContextRefreshedEvent> {
    private boolean alreadySetup = false;
    @Autowired
    UserDao userDao;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    RoleDao roleDao;
    @Autowired
    PrivilegeDao privilegeDao;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        if (alreadySetup) {
            return;
        }

        // == create initial privileges
        final Privilege readPrivilege = createPrivilegeIfNotFound("READ_PRIVILEGE");
        final Privilege writePrivilege = createPrivilegeIfNotFound("WRITE_PRIVILEGE");
        final Privilege passwordPrivilege = createPrivilegeIfNotFound("CHANGE_PASSWORD_PRIVILEGE");

        // == create initial roles
        final List<Privilege> adminPrivileges = Arrays.asList(readPrivilege, writePrivilege, passwordPrivilege);
        final List<Privilege> userPrivileges = Arrays.asList(readPrivilege, passwordPrivilege);
        createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
        createRoleIfNotFound("ROLE_USER", userPrivileges);

        final Role adminRole = roleDao.findByName("ROLE_ADMIN");
        
        User user3 = userDao.findByName("user");
        if (user3 != null) {alreadySetup = true; return;}
        final User userAdmin = new User();
        userAdmin.setFirstName("Admin");
        userAdmin.setLastName("Admin");
        userAdmin.setPassword(passwordEncoder.encode("user"));
        userAdmin.setLogin("user");
        userAdmin.setEnabled(true);
        userAdmin.setRoles(Arrays.asList(adminRole));
        userDao.save(userAdmin);

        alreadySetup = true;
    }
    @Transactional
    private final Privilege createPrivilegeIfNotFound(final String name) {
        Privilege privilege = privilegeDao.findByName(name);
        if (privilege == null) {
            privilege = new Privilege(name);
            privilegeDao.save(privilege);
        }
        return privilege;
    }

    @Transactional
    private final Role createRoleIfNotFound(final String name, final Collection<Privilege> privileges) {
        Role role = roleDao.findByName(name);
        if (role == null) {
            role = new Role(name);
            role.setPrivileges(privileges);
            roleDao.save(role);
        }
        return role;
    }

}
