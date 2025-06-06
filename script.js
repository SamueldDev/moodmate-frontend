

const API_URL = 'http://localhost:3000/api/suggestions'; // ← Replace with your actual backend

const container = document.getElementById('suggestions-container');

function groupByMood(suggestions) {
  return suggestions.reduce((acc, item) => {
    acc[item.mood] = acc[item.mood] || [];
    acc[item.mood].push(item);
    return acc;
  }, {});
}

function renderSuggestions(data) {
  const grouped = groupByMood(data);
  container.innerHTML = '';

  for (const mood in grouped) {
    const section = document.createElement('div');
    section.className = 'bg-white shadow p-4 rounded-lg';

    const title = document.createElement('h2');
    title.className = 'text-xl font-semibold mb-2 capitalize text-blue-600';
    title.textContent = mood;
    section.appendChild(title);

    const list = document.createElement('ul');
    grouped[mood].forEach(suggestion => {
      const li = document.createElement('li');
      li.className = 'mb-1';
      li.innerHTML = `<span class="font-medium text-gray-700">${suggestion.category}</span>: ${suggestion.content}`;
      list.appendChild(li);
    });

    section.appendChild(list);
    container.appendChild(section);
  }
}

async function fetchSuggestions() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderSuggestions(data);
  } catch (error) {
    container.innerHTML = '<p class="text-red-600">Failed to load suggestions.</p>';
    console.error(error);
  }
}

fetchSuggestions();
