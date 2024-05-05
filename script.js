$(document).ready(function () {
    $('#teamForm').submit(function (event) {
        event.preventDefault();

        const namesInput = $('#names').val();
        const numGroupsInput = parseInt($('#numGroups').val());

        if (namesInput.trim() === '') {
            alert('Mohon masukkan nama anggota kelompok.');
            return;
        }

        if (numGroupsInput < 1 || isNaN(numGroupsInput)) {
            alert('Mohon masukkan jumlah kelompok yang valid.');
            return;
        }

        const namesArray = namesInput.split('\n').map(name => name.trim());

        const teams = generateTeams(namesArray, numGroupsInput);

        displayTeams(teams);
    });
});

function generateTeams(names, numGroups) {
    let teams = [];
    let shuffledNames = names.slice();
    for (let i = shuffledNames.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledNames[i], shuffledNames[j]] = [shuffledNames[j], shuffledNames[i]];
    }
    for (let i = 0; i < numGroups; i++) {
        teams.push([]);
    }
    for (let i = 0; i < shuffledNames.length; i++) {
        const groupIndex = i % numGroups;
        teams[groupIndex].push(shuffledNames[i]);
    }
    return teams;
}

function displayTeams(teams) {
    const teamsContainer = $('#teamsContainer');
    teamsContainer.empty();

    const subject = $('<h2>').text(`Mata Kuliah: ${$('#course').val()}`);
    $('#courseContainer').html(subject);

    teams.forEach((team, index) => {
        const teamDiv = $('<div>').addClass('team');
        teamDiv.append($('<h3>').text(`Kelompok ${index + 1}`));
        const teamList = $('<ul>');
        team.forEach(member => {
            const listItem = $('<li>').text(member);
            teamList.append(listItem);
        });
        teamDiv.append(teamList);
        teamsContainer.append(teamDiv);
    });
}
