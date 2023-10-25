$(document).ready(() => {
    var $root = $('#root');

    fetch('https://raw.githubusercontent.com/julkis-ul/sort-biblio/main/bibliography.json')
        .then(response => response.json())
        .then(data => {
            var toSort = handleData(data);

            fetch('https://raw.githubusercontent.com/julkis-ul/sort-biblio/main/names.json')
                .then(response => response.json())
                .then(names => {
                    handleNames(names, toSort)
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

    function handleData(data) {
        var toSort = [];

        for (var [ix, el] of Object.entries(data)) {
            var elToSort = {
                text: el,
                index: Number(ix),
            }
            toSort.push(elToSort);
        }

        return toSort;
    }

    function handleNames(names, toSort) {
        for (var [ix, name] of Object.entries(names)) {
            $root.append(name + ': ');

            var namesdivided = name.split(' ');

            toSort.forEach((el, ix) => {
                if (el.text.toLowerCase().includes(namesdivided[0].toLowerCase())) {
                    $root.append(el.index + ', ');
                }
            });
            $root.append('<br>');
        }

        // $root.append(names.json)
    }
});
