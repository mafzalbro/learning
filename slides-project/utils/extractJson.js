function isEscaped(inputString, i) {
    let escapeCount = 0;
    let j = i - 1;
    while (j >= 0 && inputString[j] === '\\') {
        escapeCount++;
        j--;
    }
    return escapeCount % 2 === 1;
}

function extractJSONSubstrings(inputString) {
    const jsonSubstrings = [];
    const stack = [];
    let startIndex = null;
    let inString = false;
    let validJSON = false;

    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];

        // Toggle inString flag when encountering an unescaped double quote
        if (char === '"' && !isEscaped(inputString, i)) {
            inString = !inString;
        }

        if (!inString) {
            if (char === '{' || char === '[') {
                if (stack.length === 0) {
                    startIndex = i; // Mark the beginning of a potential JSON substring
                }
                stack.push(char);
            } else if (char === '}' || char === ']') {
                if (stack.length > 0) {
                    const last = stack[stack.length - 1];
                    if ((last === '{' && char === '}') || (last === '[' && char === ']')) {
                        stack.pop();
                        if (stack.length === 0 && startIndex !== null) {
                            const extracted = inputString.substring(startIndex, i + 1);
                            try {
                                JSON.parse(extracted); // Check if valid JSON
                                jsonSubstrings.push(extracted);
                                validJSON = true;
                            } catch (error) {
                                validJSON = false;
                            }
                            startIndex = null;
                        }
                    } else {
                        stack.length = 0;
                        startIndex = null;
                        validJSON = false;
                    }
                }
            }
        }
    }
    return validJSON ? jsonSubstrings : [];
}

function parseExtractedJSON(inputString) {
    const jsonSubstrings = extractJSONSubstrings(inputString);
    return jsonSubstrings.map(jsonStr => {
        try {
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("Failed to parse JSON substring:", jsonStr, error);
            return null;
        }
    }).filter(item => item !== null);
}

module.exports = { parseExtractedJSON, extractJSONSubstrings };