var siteName = document.getElementById('bookmarkName');
var siteUrl = document.getElementById('bookmarkURL');
var closeBtn = document.getElementById('closeBtn');
var modal = document.getElementById('modaltest')
var bookmarkList = [];

if (localStorage.getItem('bookmarker') != null) {
    bookmarkList = JSON.parse(localStorage.getItem('bookmarker'));
    display();
}

function addbookmark() {

    if (validationSiteName() == true && validationSiteUrl() == true) {

        var bookmark = {
            name: siteName.value,
            url: siteUrl.value,
        }
        bookmarkList.unshift(bookmark);
        localStorage.setItem('bookmarker', JSON.stringify(bookmarkList));

        display();
        clearData();
    }
    else {
        modal.style.display = 'flex';

    }

}

closeBtn.addEventListener('click', closemodal);

document.getElementById('modaltest').addEventListener('click', function (e) {
    if (e.target.getAttribute('id') == 'modaltest') {
        closemodal();
    }
});
document.addEventListener('keyup', function (e) {
    if (e.key == 'Escape') {
        closemodal();
    }
})

function closemodal() {
    modal.style.display = 'none';
}



function display() {
    var temp = '';
    for (var i = 0; i < bookmarkList.length; i++) {
        temp += `<tr>
        <td>${i + 1}</td>
        <td>${bookmarkList[i].name}</td>
        <td>
        <a href="https://${bookmarkList[i].url}" target="_blank"><button class="btn btn-visit btn-success">
        <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
        </a>
        </td>
        <td>
            <button onclick="deleteBookmark(${i})" id="delete-btn" class="btn btn-danger btn-delete pe-2">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
        </td>
    </tr> `
    }
    document.getElementById('tableData').innerHTML = temp;
}


function clearData() {
    siteName.value = '';
    siteUrl.value = '';
    document.getElementById('bookmarkName').classList.remove('is-invalid');
    document.getElementById('bookmarkName').classList.remove('is-valid');
    document.getElementById('bookmarkURL').classList.remove('is-invalid');
    document.getElementById('bookmarkURL').classList.remove('is-valid');
}


function deleteBookmark(id) {
    bookmarkList.splice(id, 1);
    localStorage.setItem('bookmarker', JSON.stringify(bookmarkList));
    display();
}


function validationSiteName() {
    var regex = /^[a-zA-Z1-9]{3,20}$/;
    var regexarbic = /^[\u0600-\u06FF\s]{3,}$/;
    var regexSpace = /^\s+/;
    siteName.value.trim();
    if (siteName.value.length == 0 || regexSpace.test(siteName.value) == true) {
        document.getElementById('bookmarkName').classList.add('is-invalid');
        return false;
    }
    if (regex.test(siteName.value) == true || regexarbic.test(siteName.value) == true) {
        document.getElementById('bookmarkName').classList.remove('is-invalid');
        document.getElementById('bookmarkName').classList.add('is-valid');
        return true;

    }
    else {
        document.getElementById('bookmarkName').classList.remove('is-valid');
        document.getElementById('bookmarkName').classList.add('is-invalid');
        return false;
    }
}

function validationSiteUrl() {
    var regex = /^(www.)?[a-zA-Z\.]{3,20}(.com|.net|.COM|.NET|.EG|.eg){1}$/;
    var regexSpace = /^\s+/;

    siteUrl.value.trim();
    if (siteUrl.value.length == 0 && regexSpace.test(siteName.value) == true) {
        document.getElementById('bookmarkURL').classList.add('is-invalid');
        return false;
    }
    if (regex.test(siteUrl.value) == true) {
        document.getElementById('bookmarkURL').classList.add('is-valid');
        document.getElementById('bookmarkURL').classList.remove('is-invalid');

        return true;

    }
    else {
        document.getElementById('bookmarkURL').classList.add('is-invalid');
        document.getElementById('bookmarkURL').classList.remove('is-valid');
        return false;

    }
}