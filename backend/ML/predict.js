exports.predict = (features) => {
    const features = features;

    // Run the Python script as a child process
    const command = `python model.py '${JSON.stringify({ features })}'`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const predictions = JSON.parse(stdout).predictions;
        res.json({ predictions });
    });
};