// Function to break the text into segments of up to 34 characters
export const getTextSegments = (textString) => {
    const segments = [];
    const lines = textString.split("\n"); // Split the text on line breaks
  
    lines.forEach((line, lineIndex) => {
      if (line === "" && lineIndex !== lines.length - 1) {
        // If the line is empty (explicit line break) and it's not the last line,
        // push a placeholder to indicate a line break should occur here.
        segments.push("\u00A0"); // Use '\n' to represent an explicit line break
      } else {
        let currentPos = 0;
        const lineLength = line.length;
  
        while (currentPos < lineLength) {
          const nextBreak =
            currentPos + 45 < lineLength ? currentPos + 45 : lineLength;
          const textSegment = line.substring(currentPos, nextBreak);
          segments.push(textSegment);
          currentPos += 45;
        }
      }
    });
  
    return segments.filter((segment) => segment !== ""); // Filter out any empty strings just in case
};

export const getRandomNumber = (limit) => {
    return Math.floor(Math.random() * limit) + 1;
}
