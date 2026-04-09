window.onload = function() { 
    let coordA = '';
    let coordB = '';
    let routeResult = '';
    let selectedNavOp = null;

    const outputElement = document.getElementById("route-result");
    const coordButtons = document.querySelectorAll('[id ^= "btn_coord_"]');

    function onCoordButtonClicked(digit) {
        outputElement.style.color = "#000000";

        if (!selectedNavOp) {
            if ((digit != '.') || (digit == '.' && !coordA.includes(digit))) { 
                coordA += digit;
            }
            outputElement.innerHTML = coordA || '0';
        } else {
            if ((digit != '.') || (digit == '.' && !coordB.includes(digit))) { 
                coordB += digit;
                outputElement.innerHTML = coordB || '0';        
            }
        }
    }

    coordButtons.forEach(button => {
        button.onclick = function() {
            onCoordButtonClicked(button.innerHTML);
        }
    });

    document.getElementById("btn_nav_mult").onclick = () => { if (coordA) selectedNavOp = 'x'; };
    document.getElementById("btn_nav_plus").onclick = () => { if (coordA) selectedNavOp = '+'; };
    document.getElementById("btn_nav_minus").onclick = () => { if (coordA) selectedNavOp = '-'; };
    document.getElementById("btn_nav_div").onclick = () => { if (coordA) selectedNavOp = '/'; };

    document.getElementById("btn_op_density").onclick = () => { 
        if (coordA) {
            selectedNavOp = 'density';
            outputElement.innerHTML = "Ввод БПЛА...";
        }
    };

    document.getElementById("btn_nav_clear").onclick = function() { 
        coordA = ''; coordB = ''; selectedNavOp = null; routeResult = '';
        outputElement.innerHTML = '0';
        outputElement.style.color = "#000000"; 
    };

    document.getElementById("btn_nav_sign").onclick = function() {
        if (!selectedNavOp && coordA) {
            coordA = (parseFloat(coordA) * -1).toString();
            outputElement.innerHTML = coordA;
        } else if (selectedNavOp && coordB) {
            coordB = (parseFloat(coordB) * -1).toString();
            outputElement.innerHTML = coordB;
        }
    };

    document.getElementById("btn_nav_percent").onclick = function() {
        if (!selectedNavOp && coordA) {
            coordA = (parseFloat(coordA) / 100).toString();
            outputElement.innerHTML = coordA;
        } else if (selectedNavOp && coordB) {
            coordB = (parseFloat(coordB) / 100).toString();
            outputElement.innerHTML = coordB;
        }
    };

    document.getElementById("btn_nav_equal").onclick = function() { 
        if (coordA === '' || coordB === '' || !selectedNavOp) return;
            
        outputElement.style.color = "#000000"; 

        switch(selectedNavOp) { 
            case 'x': routeResult = (+coordA) * (+coordB); break;
            case '+': routeResult = (+coordA) + (+coordB); break;
            case '-': routeResult = (+coordA) - (+coordB); break;
            case '/': routeResult = (+coordA) / (+coordB); break;
            case 'density':
                let radiusMeters = parseFloat(coordA);
                let radiusKm = radiusMeters / 1000;
                let uavCount = parseFloat(coordB);

                if (radiusMeters <= 0 || uavCount < 0) {
                    routeResult = "ОШИБКА";
                } else {
                    let volume = (2 / 3) * Math.PI * Math.pow(radiusKm, 3);
                    let density = uavCount / volume;
                    routeResult = density.toFixed(3);
                }
                break;
        }
        
        coordA = routeResult.toString();
        coordB = '';
        selectedNavOp = null;
        outputElement.innerHTML = coordA;
    }
};