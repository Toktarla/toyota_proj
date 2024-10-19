function generateRandomUserId() {
    const length = 10;
    let randomUserId = '';

    for (let i = 0; i < length; i++) {
        const randomDigit = Math.floor(Math.random() * 10); 
        randomUserId += randomDigit.toString();
    }

    return parseInt(randomUserId, 10);
}

module.exports = { generateRandomUserId }