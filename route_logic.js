window.onload = function() { 
    let coordA = '';
    let coordB = '';
    let routeResult = '';
    let selectedNavOp = null;

    const outputElement = document.getElementById("route-result");
    const coordButtons = document.querySelectorAll('[id ^= "btn_coord_"]');

    function onCoordButtonClicked(digit) {
        outputElement.style.color = "";

        if (!selectedNavOp) {
            if ((digit != '.') || (digit == '.' && !coordA.includes(digit))) { 
                coordA += digit;
            }
            outputElement.innerHTML = coordA;
        } else {
            if ((digit != '.') || (digit == '.' && !coordB.includes(digit))) { 
                coordB += digit;
                outputElement.innerHTML = coordB;        
            }
        }
    }

    coordButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onCoordButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_nav_mult").onclick = function() { 
        if (coordA === '') return;
        selectedNavOp = 'x';
        outputElement.style.color = "";
    }
    document.getElementById("btn_nav_plus").onclick = function() { 
        if (coordA === '') return;
        selectedNavOp = '+';
        outputElement.style.color = ""; 
    }
    document.getElementById("btn_nav_minus").onclick = function() { 
        if (coordA === '') return;
        selectedNavOp = '-';
        outputElement.style.color = ""; 
    }
    document.getElementById("btn_nav_div").onclick = function() { 
        if (coordA === '') return;
        selectedNavOp = '/';
        outputElement.style.color = ""; 
    }

    document.getElementById("btn_nav_clear").onclick = function() { 
        coordA = '';
        coordB = '';
        selectedNavOp = null;
        routeResult = '';
        outputElement.innerHTML = 0;
        outputElement.style.color = ""; 
    }

    document.getElementById("btn_nav_sign").onclick = function() {
        outputElement.style.color = "";
        if (!selectedNavOp && coordA !== '') {
            coordA = (parseFloat(coordA) * -1).toString();
            outputElement.innerHTML = coordA;
        } else if (selectedNavOp && coordB !== '') {
            coordB = (parseFloat(coordB) * -1).toString();
            outputElement.innerHTML = coordB;
        }
    }

    document.getElementById("btn_nav_percent").onclick = function() {
        outputElement.style.color = "";
        if (!selectedNavOp && coordA !== '') {
            coordA = (parseFloat(coordA) / 100).toString();
            outputElement.innerHTML = coordA;
        } else if (selectedNavOp && coordB !== '') {
            coordB = (parseFloat(coordB) / 100).toString();
            outputElement.innerHTML = coordB;
        }
    }

    document.getElementById("btn_nav_density").onclick = function() {
        if (coordA === '' || coordB === '') return;

        let radiusMeters = parseFloat(coordA);
        let radiusKm = radiusMeters / 1000;
        
        let uavCount = parseFloat(coordB);

        if (radiusMeters <= 0 || uavCount < 0) {
            outputElement.style.color = "";
            outputElement.innerHTML = "ОШИБКА";
            coordA = '';
            coordB = '';
            selectedNavOp = null;
            return;
        }

        let volume = (2 / 3) * Math.PI * Math.pow(radiusKm, 3);
        let density = uavCount / volume;
        let formattedDensity = density.toFixed(3);

        if (density > 0.5) {
            outputElement.style.color = "#ff4d4d";
        } else {
            outputElement.style.color = "#4dff4d";
        }

        coordA = formattedDensity.toString();
        coordB = '';
        selectedNavOp = null;
        
        outputElement.innerHTML = coordA;
    }

    document.getElementById("btn_nav_equal").onclick = function() { 
        if (coordA === '' || coordB === '' || !selectedNavOp) return;
            
        outputElement.style.color = ""; 

        switch(selectedNavOp) { 
            case 'x':
                routeResult = (+coordA) * (+coordB);
                break;
            case '+':
                routeResult = (+coordA) + (+coordB);
                break;
            case '-':
                routeResult = (+coordA) - (+coordB);
                break;
            case '/':
                routeResult = (+coordA) / (+coordB);
                break;
            default:
                break;
        }
        
        coordA = routeResult.toString();
        coordB = '';
        selectedNavOp = null;

        outputElement.innerHTML = coordA;
    }
};