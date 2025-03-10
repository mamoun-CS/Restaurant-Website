const { useState, useEffect } = React;

let flag=0 ;
let data = {
    info: "معلومات عن المطعم",
    date: "2025-02-10",  // Example date
    location: "نابلس رفيديا"  // Example location
};
const App = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prevStep) => prevStep + 1);
        }, 2000); // Change every 1 second

        if (step >= 4) {
            clearInterval(interval);
            setStep(0); // Reset the step after reaching 4
        }

        return () => clearInterval(interval); // Cleanup on unmount
    }, [step]); // Add step as a dependency


    return (
        <div>
            {step >= 1 && <h1>{data.info}</h1> }
            {step >= 2 && <h1>{data.date}</h1>}
            {step >= 3 && <h1>{data.location}</h1>}
        </div>
    );
};



// Render React Component
ReactDOM.render(<App />, document.getElementById("root"));
