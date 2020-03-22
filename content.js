/* Listen for messages */
const rowSubj = "ctl00_ctl00_contentPane_MainPanel_MainContent_gvRegisteredList_DXDataRow";
const rowTable = "ctl00_ctl00_contentPane_MainPanel_MainContent_gvTimeTable_DXDataRow";
const rowSid = "dxgvTitlePanel_Mulberry"

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {
        /* Call the specified callback, passing
           the web-pages DOM content as argument */
        matchData();
        sendResponse(document.getElementById("ctl00_ctl00_contentPane_MainPanel_MainContent_gvRegisteredList_DXDataRow0").innerHTML);
    }
})

function getData(id) {
    ``
    let list = document.getElementById(id);
    if (list) {
        return [...list.getElementsByTagName('TD')].map(ele => ele.innerHTML);
    }
}

function getSid() {
    let sidElem = document.getElementsByClassName(rowSid)[0].innerHTML;
    return sidElem.match(/\d{8}/)[0]
}

function matchData() {
    const tables = [];
    const subs = [];
    const result = [];
    let i = 0;
    const sid = getSid();
    while (getData(rowTable + i)) {
        tables.push(getData(rowTable + i));
        i++;
    }
    let j = 0;
    while (getData(rowSubj + j)) {
        subs.push(getData(rowSubj + j));
        j++;
    }
    subs.forEach(sub => {
        tables.forEach(table => {
            if (table[4] === sub[0]) {
                const time = table[1].split('-');
                result.push(
                    {
                        MSSV: sid,
                        Ma_HP: sub[3],
                        Ma_Lop: sub[0],
                        Ten_Lop: sub[2],
                        Tin_Chi: sub[9],
                        Loai_Lop: sub[4],
                        Thu: table[0],
                        Phong_Hoc: table[3],
                        Tuan_Hoc: table[2],
                        Bat_Dau: time[0],
                        Ket_Thuc: time[1]
                    }
                )
            }
        })
    });
    console.log(result);
}