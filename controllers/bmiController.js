exports.calculateBMI = (req, res) => {
    const { weight, height } = req.body;

    if (!weight || !height || height <= 0 || weight <= 0) {
        return res.send(`
            <link rel="stylesheet" href="/style/style.css">
            <div class="result-container">
                <h3 class="error">Invalid input. Please enter positive numbers.</h3>
                <a class="back-link" href="/bmi">Go back</a>
            </div>
        `);
    }

    const bmi = (weight / (height * height)).toFixed(2);
    let category;

    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    res.send(`
        <link rel="stylesheet" href="/style/style.css">
        <div class="result-container">
            <h1>Your BMI is ${bmi}</h1>
            <h2>You are in the category: <span class="${getClass(category)}">${category}</span></h2>
            <a class="back-link" href="/bmi">Go back</a>
        </div>
    `);

    function getClass(category) {
        switch (category) {
            case "Underweight": return "underweight";
            case "Normal weight": return "normal";
            case "Overweight": return "overweight";
            case "Obese": return "obese";
            default: return "";
        }
    }
};
