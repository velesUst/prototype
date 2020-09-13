package ru.mvz.corp.dto;

import ru.mvz.corp.validation.PasswordMatches;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@PasswordMatches
public class UserDto {

    private Long id;
    @NotNull(message = "Имя обязательное поле для заполнения")
    @Size(min = 2, message = "Минимум 2 символа")
    private String firstName;
    @NotNull(message = "Фамилия обязательное поле для заполнения")
    @Size(min = 2, message = "Минимум 2 символа")
    private String lastName;
    @NotNull(message = "Логин обязательное поле для заполнения")
    @Size(min = 3, message = "Минимум 3 символа")
    private String login;
    @NotNull(message = "Минимум 6 символа")
    @Size(min = 6, message = "Минимум 6 символа")
    private String password;
    @NotNull(message = "Минимум 6 символа")
    @Size(min = 6, message = "Минимум 6 символа")
    private String passwordConfirm;

    @NotNull
    private boolean enabled;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
