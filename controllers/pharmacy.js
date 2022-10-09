const cheerio = require('cheerio');
const X = require('axios');

async function get(req, res) {
    try {
        const options = {
            method: 'GET',
            url: process.env.BASE_URL+req.params.city
        }
        const rest = await X(options);
        const $ = cheerio.load(rest.data);
        var pharmacylist = [];
        var cheerioList = $('#nav-bugun');
        (cheerioList['0'].children[2].children[1].children).forEach((item, index) => {
            const title = req.params.city == 'istanbul' ? item.children[0].children[0].children[0].children[0].children[0].data : item.children[0].children[0].children[0].children[0].children[0].children[0].data;
            const address = item.children[0].children[0].children[1].children[0].data;
            const phone_number = item.children[0].children[0].children[2].children[0].data;
            var isLocationList;
            var isDescription;
            var locations;
            var description;
            if (item.children[0].children[0].children[1].children[1].children[0] != undefined) {
                // açıklama olmayanlar
                isDescription = false;
                if (item.children[0].children[0].children[1].children[1].children[1] != null) {
                    isLocationList = true;
                    const firstPlace = item.children[0].children[0].children[1].children[1].children[0].children[0].data;
                    const secondPlace = item.children[0].children[0].children[1].children[1].children[1].children[0].data;
                    locations = `${firstPlace},${secondPlace}`;
                } else {
                    isLocationList = false;
                    locations = item.children[0].children[0].children[1].children[1].children[0].children[0].data;
                }
            } else {
                // açıklaması olanlar
                isDescription = true;
                description = item.children[0].children[0].children[1].children[3].children[0].data;
                if (item.children[0].children[0].children[1].children[5].children[1] != null) {
                    isLocationList = true;
                    const firstPlace = item.children[0].children[0].children[1].children[5].children[0].children[0].data;
                    const secondPlace = item.children[0].children[0].children[1].children[5].children[1].children[0].data;
                    locations = `${firstPlace},${secondPlace}`;
                } else {
                    isLocationList = false;
                    if(item.children[0].children[0].children[1].children[5].children[0] != null){
                        locations = item.children[0].children[0].children[1].children[5].children[0].children[0].data;
                    }else{
                        // ekstra açıklama
                        locations = item.children[0].children[0].children[1].children[9].children[0].children[0].data;
                    }
                }
            }
            pharmacylist.push({ title, address,locations, phone_number,description,isLocationList,isDescription },);
        });
        return res.status(200).json(pharmacylist);
    } catch (e) {
        return res.status(404).json({ message: String(e) });
    }
};

module.exports = {
    get
}
