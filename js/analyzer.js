function analyzeText() {
    const text = document.getElementById('text-input').value;
    const timestamp = new Date().toISOString();
    
    const analysis = {
        letters: text.match(/[a-zA-Z]/g)?.length || 0,
        words: text.trim().split(/\s+/).length,
        spaces: text.match(/\s/g)?.length || 0,
        newlines: text.match(/\n/g)?.length || 0,
        specialSymbols: text.match(/[^a-zA-Z0-9\s]/g)?.length || 0,
        pronouns: countPronouns(text),
        prepositions: countPrepositions(text),
        articles: countArticles(text)
    };

    // Log the click event on analyze button (Q2 format)
    console.log(`${timestamp}, click, button`);

    displayResults(analysis);
}

function countPronouns(text) {
    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
    return countWords(text, pronouns);
}

function countPrepositions(text) {
    const prepositions = ['in', 'on', 'at', 'by', 'for', 'with', 'to', 'from', 'of', 'about'];
    return countWords(text, prepositions);
}

function countArticles(text) {
    const articles = ['a', 'an', 'the'];
    return countWords(text, articles);
}

function countWords(text, wordList) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    return words.filter(word => wordList.includes(word)).reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {});
}

function displayResults(analysis) {
    const resultsDiv = document.getElementById('analysis-results');
    resultsDiv.innerHTML = `
        <h3>Analysis Results:</h3>
        <p>Letters: ${analysis.letters}</p>
        <p>Words: ${analysis.words}</p>
        <p>Spaces: ${analysis.spaces}</p>
        <p>Newlines: ${analysis.newlines}</p>
        <p>Special Symbols: ${analysis.specialSymbols}</p>
        <h4>Pronouns:</h4>
        <pre>${JSON.stringify(analysis.pronouns, null, 2)}</pre>
        <h4>Prepositions:</h4>
        <pre>${JSON.stringify(analysis.prepositions, null, 2)}</pre>
        <h4>Articles:</h4>
        <pre>${JSON.stringify(analysis.articles, null, 2)}</pre>
    `;
}