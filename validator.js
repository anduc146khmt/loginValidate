const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const app = {
    form : 
    [
        {
            type: 'text',
            id: 'fullname',
            label: 'Full name',
            placeholder: 'Enter your name',
        },
        {
            type: 'text',
            id: 'email',
            label: 'Email',
            placeholder: 'Ex: email@domain.com',
        },
        {
            type: 'password',
            id: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
        },
        {
            type: 'password',
            id: 'password_confirmation',
            label: 'Confirm Password',
            placeholder: 'Repeat your password',
        },
        {
            type: 'select',
            id: 'country',
            label: 'Country',
            option: [
                {
                    value: "",
                    text: "Select your country",
                },
                {
                    value: "Vietnam",
                    text: "Viet Nam",
                },
                {
                    value: "Canada",
                    text: "Canada",
                },
                {
                    value: "London",
                    text: "London",
                },
                {
                    value: "Singapore",
                    text: "Singapore",
                },
            ]
        },
        {
            type: 'radio',
            id: 'job',
            label: 'You are...',
            option: [
                {
                    value: "student",
                    text: "Student",
                },
                {
                    value: "applicant",
                    text: "Applicant",
                },
                {
                    value: "recruiter",
                    text: "Recruiter",
                },
            ]
        },
        {
            type: 'checkbox',
            id: 'field',
            label: 'Your interesting field...',
            option: [
                {
                    value: "software",
                    text: "Software",
                },
                {
                    value: "data",
                    text: "Data",
                },
                {
                    value: "fullstack",
                    text: "Fullstack",
                },
                {
                    value: "devops",
                    text: "Devops",
                },
            ]
        },
    ],
    renderElement(element) {
        if(element.type == 'text' || element.type == 'password') {
            if($(`.form__group.${element.id}`)) {
                $(`.form__group.${element.id}`).innerHTML = `
                <label for="${element.id}" class="form__label">${element.label}</label>
                <input type="text" name="${element.id}" id="${element.id}" placeholder="${element.placeholder}" class="form__input">
                <p class="form__message"></p>`
                if(element.id == 'password' || element.id == 'password_confirmation') {
                    $(`.form__group.${element.id} input`).type = 'password';
                }
                if(element.id == 'password') $(`.form__group.${element.id}`).innerHTML +=  ` <i class="fa fa-eye-slash password__icon"></i>`;
            }
        }
        else if(element.type == 'select') {
            $(`.form__group.${element.type}`).innerHTML = `  
            <label for="${element.id}" class="form__label">${element.label}</label>
            <select id="${element.id}" name="${element.id}" class="form__input">
                <option value="${element.option[0].value}">${element.option[0].text}</option>
                <option value="${element.option[1].value}">${element.option[1].text}</option>
                <option value="${element.option[2].value}">${element.option[2].text}</option>
                <option value="${element.option[3].value}">${element.option[3].text}</option>
                <option value="${element.option[4].value}">${element.option[4].text}</option>
            </select>
            <p class="form__message"></p>
            `
        }
        else if(element.type == 'radio') {
            $(`.form__group.${element.type}`).innerHTML = `  
            <label for="${element.id}" class="form__label">${element.label}</label>
                <div class="form__input" id="${element.id}">
                    <div class="form__choice">
                        <input type="${element.type}" name="${element.id}" value="${element.option[0].value}">
                        <p>${element.option[0].text}</p>
                    </div>
                    <div class="form__choice">
                        <input type="${element.type}" name="${element.id}" value="${element.option[1].value}">
                        <p>${element.option[1].text}</p>
                    </div>
                    <div class="form__choice">
                        <input type="${element.type}" name="${element.id}" value="${element.option[2].value}">
                        <p>${element.option[2].text}</p>
                    </div>
                </div>
                <p class="form__message"></p>
            `
        }
        else {
            $(`.form__group.${element.type}`).innerHTML = `  
            <label for="${element.id}" class="form__label">${element.label}</label>
                <div class="form__input" id="${element.id}">
                    <div class="form__choice">
                        <input type="${element.type}" name="${element.id}" value="${element.option[0].value}">
                        <p>${element.option[0].text}</p>
                    </div>
                    <div class="form__choice">
                        <input type="${element.type}" name="${element.id}" value="${element.option[1].value}">
                        <p>${element.option[1].text}</p>
                    </div>
                    <div class="form__choice">
                        <input type="${element.type}" name="${element.id}" value="${element.option[2].value}">
                        <p>${element.option[2].text}</p>
                    </div>
                    <div class="form__choice">
                        <input type="${element.type}" name="${element.id}" value="${element.option[3].value}">
                        <p>${element.option[3].text}</p>
                    </div>
                </div>
                <p class="form__message"></p>
            `
        }
    },
    renderBrowser: function() {
        this.form.forEach(function(element){
            app.renderElement(element);
        });
    },
    delayBtn: function() {
        $('.header__content .btn').onclick = function(e) {
            e.preventDefault();
        }
    },
    start: function() {
        this.renderBrowser();
        this.delayBtn();
    }
}
function Validator(options) {
    var selectorRules = {};
    var isSuccess = false;
    var choice = ['country', 'job', 'field'];
    function validate(rule) {
        var inputElements = $$(rule.selector);
        var errorMessage = '';
        var isValid = false;
        var isChoice = false;
        inputElements.forEach(function(inputElement) {
            if(rule.selector.includes('job')) {
                if(inputElement.checked) isValid = true;  
                isChoice = true;
            }
            else if(rule.selector.includes('field')) {
                if(inputElement.checked) isValid = true;   
                isChoice = true;
            }
            else if(rule.selector == '#country') {
                isChoice = true;
            }
            else {
                for(var i = 0; i < selectorRules[rule.selector].length; i++) {
                    errorMessage = selectorRules[rule.selector][i](inputElement.value);
                    if(errorMessage) break;
                }
                if(errorMessage) {
                    inputElement.parentElement.querySelector(options.input).classList.add('invalid');
                    inputElement.parentElement.querySelector(options.message).innerHTML = errorMessage;
                }
                else {
                    inputElement.parentElement.querySelector(options.input).classList.remove('invalid');
                    inputElement.parentElement.querySelector(options.message).innerHTML = '';
                }
            }
        })
        if(!isChoice) return;
        var inputElement = '';
        if(rule.selector.includes('job')) {
            inputElement = $('#job');
        }
        else if(rule.selector.includes('field')){
            inputElement = $('#field');
        }
        else {
            inputElement = $('#country');
            var selectedValue = inputElement.options[inputElement.selectedIndex].value;
            errorMessage = selectorRules[rule.selector][0](selectedValue);
            if(!errorMessage) isValid = true;
        }
        if(!isValid) {
            errorMessage = selectorRules[rule.selector][0]('');
            inputElement.parentElement.querySelector(options.input).classList.add('invalid');
            inputElement.parentElement.querySelector(options.message).innerHTML = errorMessage;
        }
        else {
            inputElement.parentElement.querySelector(options.input).classList.remove('invalid');
            inputElement.parentElement.querySelector(options.message).innerHTML = '';
        }
    }
    function makeDefault(inputElement) {
        inputElement.parentElement.querySelector(options.input).classList.remove('invalid');
        inputElement.parentElement.querySelector(options.message).innerHTML = '';
    }
    function handlePassword(inputElement) {
        inputElement.ondblclick = function() {
            $(options.optional).classList.toggle('exist');
        }
        $('.password__icon').onclick = function() {
            var parentElement = this.parentElement;
            var inputElement = parentElement.querySelector('input');
            if(inputElement.type === 'password') {
                inputElement.type = 'text';
                this.classList.replace('fa-eye-slash', 'fa-eye');
            }
            else {
                inputElement.type = 'password';
                this.classList.replace('fa-eye', 'fa-eye-slash');
            }
        }
    }
    options.rules.forEach(function(rule) {
        var inputElement = $(rule.selector);
        if(!Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector] = [];
        }
        selectorRules[rule.selector].push(rule.test);
        inputElement.onblur = function() {
            validate(rule);
        }
        inputElement.oninput = function() {
            for(var i = 0; i < choice.length; i++) {
                if(rule.selector.includes(choice[i])) return;
            }
            makeDefault(inputElement);
        }
        if(inputElement.id == 'password') {
            handlePassword(inputElement);
        }
    })
    $(options.submit).onclick = function(e) {
        e.preventDefault();
        options.rules.forEach(function(rule) {
            validate(rule);
        });
        if(!$('.invalid')) isSuccess = true;
        if(isSuccess) {
            var enabledInput = $$(`${options.form} [name]`);
            var output = Array.from(enabledInput).reduce(function(values, input) {
                if(input.type == 'checkbox') {
                    if(!Array.isArray(values[input.name])) {
                        values[input.name] = [];
                    }
                    if(input.checked) values[input.name].push(input.value);
                   
                }
                else if (input.type == 'radio') {
                    if(input.checked) values[input.name] = input.value;
                }
                else {
                    values[input.name] = input.value;
                }
                return values;
            },{});
            options.getOutput(output);
        }
    }
}
Validator.isRequired = function(selector, message) {
    return  {
        selector : selector,
        test: function(value) {
            if($(selector).type === 'text') value.trim();
            return value ? undefined : message;
        }
    }
}
Validator.isEmail = function(selector, message) {
    return  {
        selector : selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message;
        }
    }
}
Validator.isStrongPassword = function(selector, minLength) {
    function checkPassword(buffer, value) {
        for(var i = 0; i < buffer.length; i++) {
            if(value.includes(buffer[i])) return true;
        }
        return false;
    }
    return {
        selector : selector,
        test: function(value) {
            const upperCase = "ABCDEFGHIJKMNOPQRSTUVWXYZ";
            const lowerCase = "abcdefghijkmnoprstuvwxyz";
            const number = "0123456789";
            const symbol = "!@#$%^&*()_+=-/";
            value = value.trim();
            if (value.length < minLength) return `Password should contains more than ${minLength} characters`;
            if(!checkPassword(upperCase, value)) return 'Password should contains upper characters';
            if(!checkPassword(lowerCase, value)) return 'Password should contains lower characters';
            if(!checkPassword(number, value)) return 'Password should contains number characters';
            if(!checkPassword(symbol, value)) return 'Password should contains special symbol';
            return undefined;
        }
    }
}
Validator.isConfirmed = function(selector, getConfirmedValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmedValue() ? undefined : message;
        }
    }
}
app.start();