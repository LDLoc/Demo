function Validator(options) {
    function validate(inputElement, rule) {
        
        var errorElement = inputElement.parentElement.querySelector('.form-message');
        var errorMessage = rule.test(inputElement.value)
        
        
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
            errorElement.style.color = '#ff632d'
        } else {
            errorElement.innerText = ""
            inputElement.parentElement.classList.remove('invalid');
            inputElement.parentElement.classList.add('success');
         
        }
        
        return !errorMessage;
        
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                });
         }
     }
    
    if (formElement) {
        
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            
            if(inputElement) {
                inputElement.onblur = function() {
                validate(inputElement, rule);
                }
            }
        });
    }
}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined :"Phần này chưa điền nè"
        }
    };
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (regex.test(value)) {
                return undefined
            }
            else if (value.trim()) {
                return 'Cần phải là email nha'
            } else {
                return "Phần này chưa điền nè"
            }
        }
    };
}

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function(value) {
            if (value.length >= min) {
                return undefined
            }
            else if (value.trim()) {
                return `Cần tối thiểu ${min} kí tự nha`
            } else {
                return "Phần này chưa điền nè"
            }
        }
    }
}


Validator.compare = function (selector, Confirmation ) {
    return {
        selector: selector,
        test: function(value) {
            if (!value.trim()) {
                return "Phần này chưa điền nè"
            }
            else if (value === Confirmation()) {
                return undefined
            } else {
                return "Không giống nhau rồi"
            }
        }
    };
}

let x;
        let toast = document.getElementById("toast-success");
        function showToastSuccess(){
            clearTimeout(x);
            toast.style.transform = "translateX(0)";
            x = setTimeout(()=>{
                toast.style.transform = "translateX(400px)"
            }, 2000);
        }
        let toast2 = document.getElementById("toast-error");
        function showToastError(){
            clearTimeout(x);
            toast2.style.transform = "translateX(0)";
            x = setTimeout(()=>{
                toast2.style.transform = "translateX(400px)"
            }, 2000);
        }
        function closeToast(){
            toast.style.transform = "translateX(400px)";
            toast2.style.transform = "translateX(400px)";
        }