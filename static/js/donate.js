//Script form district and police station
document.getElementById('district').addEventListener('change', function () {
    var policeStationSelect = document.getElementById('policeStation');
    var district = this.value;

    // Clear previous options
    policeStationSelect.innerHTML = '<option value="">Select Police Station</option>';

    // Police station data for each district
    var policeStations = {
        bagerhat: ['Bagerhat Sadar', 'Chitalmari', 'Fakirhat', 'Kachua', 'Mollahat', 'Mongla', 'Morrellganj', 'Rampal', 'Sarankhola'],

        bandarban: ['Alikadam', 'Bandarban Sadar', 'Lama', 'Naikhongchhari', 'Rowangchhari', 'Ruma', 'Thanchi'],

        barguna: ['Amtoli', 'Bamna', 'Barguna', 'Pathargata', 'Taltoli'],

        barishal: ['Agailjhara', 'Airport', 'Babuganj', 'Bakerganj', 'Banaripara', 'Bandar', 'Gournadi', 'Hizla', 'Kawnia', 'Kazirhat', 'Kotwali Model', 'Mehediganj', 'Muladi', 'Wazirpur'],

        bhola: ['Bhola Sadar Model', 'Burhanuddin', 'Charfasson', 'Dakshin Aicha', 'Doulatkhan', 'Dularhat', 'Lalmohan', 'Manpura', 'Soshivusian', 'Tazumuddin'],

        bogura: ['Adamdighi', 'Bogura Sadar', 'Dhunat', 'Dhupchanchia', 'Gabtali', 'Kahalu', 'Nandigram', 'Sariakandi', 'Shahjahanpur', 'Sherpur', 'Shibganj', 'Sonatola'],

        brahmanbaria: ['Akhaura', 'Ashuganj', 'Bancharamapur', 'Bijoynagar', 'Bramanbaria Sadar', 'Kasba', 'Nabinagar', 'Nasirnagar', 'Sarail'],

        chandpur: ['Chandpur Sadar Model', 'Faridganj', 'Haimchar', 'Haziganj', 'Kachua', 'Matlab Dakshin', 'Matlab Uttar', 'Shahrashti'],

        chapainawabganj: ['Bholahat', 'Gomostapur', 'Nachol', 'Sadar Model', 'Shibganj'],

        chattogram: ['Akbar Shah', 'Anwara', 'Bakalia', 'Bandar', 'Banshkhali', 'Bayezid Bostami', 'Bhujpura', 'Boalkhali', 'Chandanaish', 'Chandgaon', 'Chawk Bazar', 'Double Mooring', 'EPZ', 'Fatikchhari', 'Halisahar', 'Hathazari', 'Jorarganj', 'Karnaphuli', 'Khulshi', 'Kotowali', 'Lohagara', 'Mirsharai', 'Pahartoli', 'Panchlaish', 'Patenga', 'Patiya', 'Rangunia', 'Raizan', 'Sadargat', 'Sandwip', 'Satkania', 'Sitakunda'],

        chuadanga: ['Alamdanga', 'Chuadanga Sadar', 'Damurhuda', 'Darshana', 'Jibannagar'],

        "cox's bazar": ['Chakaria', 'Cox’s Bazar', 'Eidgaon', 'Kutubdia', 'Maheshkhali', 'Pekua', 'Ramu', 'Teknaf', 'Ukhia'],

        cumilla: ['Bangora Bazar', 'Barura', 'Brahmanpara', 'Burichong', 'Chandina', 'Chaudhagram', 'Daudkandi', 'Debidwar', 'Homna', 'Kotwali Model', 'Laksam', 'Lalmol', 'Manoharganj', 'Meghna', 'Muradnagar', 'Nangalkot', 'Sadar Dakshin', 'Sada Dakshin', 'Titas'],

        dhaka: ['Adabor', 'Airport', 'Ashulia', 'Badda', 'Banani', 'Bangshal', 'Cantonment', 'Chawk Bazar', 'Dakshin Khan', 'Darus Salam', 'Demra', 'Dhamrai', 'Dhanmondi', 'Dohar', 'Gendaria', 'Gulshan', 'Hatirjheel', 'Hazaribagh', 'Jatrabari', 'Kadomtali', 'Kafrul', 'Kalabagan', 'Kamrangirchar', 'Keraniganj Model', 'Khilgaon', 'Khikhet', 'Kotwali', 'Lalbagh', 'Mirpur', 'Mohammadpur', 'Motijheel', 'Mugda', 'Nawabganj', 'New Market', 'Pallabi', 'Paltan Model', 'Ramna Model', 'Rampura', 'Rupnagar', 'Sabujbagh', 'Savar', 'Shah Ali', 'Shahbagh', 'Shahjahanpur', 'Shampur', 'Sher-E-Bangla Nagar', 'South Keraniganj', 'Sutrapur', 'Tejgaon', 'Tejgaon Industrial Area', 'Turag', 'Uttara East', 'Uttara West', 'Uttarakhon', 'Vashantek', 'Vatara', 'Wari'],

        dinajpur: ['Biral', 'Birampur', 'Birganj', 'Bochaganj', 'Chirirbandar', 'Ghoraghat', 'Hakimpur', 'Kaharole', 'Khansama', 'Kotwali', 'Nawabganj', 'Parbatipur', 'Phulpur'],

        faridpur: ['Alfadanga', 'Bhanga', 'Boalmari', 'Char Bhadrashan', 'Kotwali', 'Madhukhali', 'Nagarkanda', 'Sadarpur', 'Saltha'],

        feni: ['Chhagalnaiya', 'Daganbhuiyan', 'Feni Sadar', 'Fulgazi', 'Parshuram', 'Sonagazi'],

        gaibanda: ['Fulchhari', 'Gaibandha Sadar', 'Gobindaganj', 'Palashbari', 'Sadullapur', 'Shaghata', 'Sundarganj'],

        gazipur: ['Bason', 'Gacha', 'Gazipur Sadar', 'Joydebpur', 'Kaliakair', 'Kaliganj', 'Kapasia', 'Kasimpur', 'Konabari', 'Pubail', 'Sreepur', 'Tongi East', 'Tongi West'],

        gopalganj: ['Gopalganj', 'Kashiani', 'Kotalipara', 'Muksudpur', 'Tungipara'],

        habiganj: ['Ajmiriganj', 'Bahubal', 'Baniachong', 'Chunarughat', 'Habiganj', 'Lakhai', 'Madhabpur', 'Nabiganj', 'Shaestaganj'],

        jamalpur: ['Bakshiganj', 'Dewanganj', 'Islampur', 'Jamalpur Sadar', 'Madarganj', 'Melandaha', 'Sarishabari'],

        jashore: ['Abhaynagar', 'Bagherpara', 'Benapole Port', 'Chaugachha', 'Jhikargachha', 'Keshabpur', 'Kotwali', 'Manirampur', 'Sharsha'],

        jhalakati: ['Jhalokati', 'Kathalia', 'Nalchity', 'Rajapur'],

        jhenaidah: ['Harinakunda', 'Jhenaidah', 'Kaliganj', 'Kotchandpur', 'Maheshpur', 'Shailkupa'],

        joypurhat: ['Akkelpour', 'Joypurhat', 'Kalai', 'Khetlal', 'Panchbibi'],

        khagrachari: ['Dighinala', 'Guimara', 'Khagrachari', 'Laxmichhari', 'Manikchhari', 'Matiranga', 'Mohalchhari', 'Panchhari', 'Ramgarh'],

        khulna: ['Aronghata', 'Batiaghata', 'Dacope', 'Daulatpur', 'Digholia', 'Dumuria', 'Horintana', 'Khalishpur', 'Khan Jahan Ali', 'Khulna Sadar', 'Koyra', 'Labanchara', 'Paikgasa', 'Phultala', 'Rupsha', 'Sonadanga Model', 'Terokhada'],

        kishoreganj: ['Austagram', 'Bajitpur', 'Bhairab', 'Hossainpur', 'Itna', 'Karimganj', 'Katiadi', 'Kishoreganj Sadar', 'Kuliarchar', 'Mithamain', 'Nikli', 'Pakundia', 'Taraail'],

        kurigram: ['Bhurungamari', 'Char Rajibpur', 'Chimari', 'Dusmara', 'Kachakata', 'Kurigram Sadar', 'Nageshwari', 'Phulbari', 'Rajarhat', 'Ulipur'],

        kushtia: ['Bheramara', 'Daulatpur', 'Islamic University', 'Khoksa', 'Kumarkhail', 'Kushtia Model', 'Mirpur'],

        lakshmipur: ['Chandragonj', 'Kamalnagar', 'Lakshmipur Sadar', 'Raipur', 'Ramganj', 'Ramgati'],

        lalmonirhat: ['Aditmari', 'Hatibandha', 'Kaliganj', 'Lalmonirhat', 'Patgram'],

        madaripur: ['Dashar', 'Kalkini', 'Madaripur Sadar', 'Rajoir', 'Shibchar'],

        magura: ['Magura Sadar', 'Mohammadpur', 'Shalikha', 'Sreepur'],

        manikganj: ['Daulatpur', 'Ghior', 'Harirampur', 'Manikganj Sadar', 'Saturia', 'Shibalaya', 'Singair'],

        meherpur: ['Gangni', 'Meherpur Sadar', 'Mujibnagar'],

        moulvibazar: ['Barlekha', 'Juri', 'Komolganj', 'Kularua', 'Moulvibazar Sadar', 'Rajnagar', 'Sreemangal'],

        munshiganj: ['Gazaria', 'Louhajong', 'Munshiganj', 'Padma Setu North', 'Sirajdikhan', 'Sreenagar', 'Tongibari'],

        mymensingh: ['Bhaluka', 'Dhoabura', 'Fulbaria', 'Gaforgao', 'Gouripur', 'Haluaghat', 'Ishwarganj', 'Kotwali', 'Muktagacha', 'Nandail', 'Pagla', 'Phulpur', 'Tarakanda', 'Trishal'],

        naogaon: ['Atrai', 'Badalgachhi', 'Dhamoirhat', 'Mahadebpur', 'Manda', 'Naogaon Sadar', 'Nimatpur', 'Patnitala', 'Porsha', 'Raninagar', 'Sapahar'],

        narail: ['Kalia', 'Lohagara', 'Naragati', 'Narail Sadar'],

        narayanganj: ['Araihazar', 'Bandar', 'Fatullah', 'Narayanganj Sadar', 'Rupganj', 'Siddhirganj', 'Sonargaon'],

        narsingdi: ['Belabo', 'Madhabdi', 'Monohardi', 'Narsingdi Sadar', 'Palash', 'Raipure', 'Shibpur'],

        natore: ['Bagatipara', 'Baraigram', 'Gurudaspur', 'Lalpur', 'Naldanga', 'Natore', 'Singra'],

        netrokona: ['Atpara', 'Barhatta', 'Durgapur', 'Kalmakanda', 'Kendua', 'Khaliajuri', 'Modon', 'Mohanganj', 'Netrokona Sadar Model', 'Purbadhala'],

        nilphamari: ['Dimla', 'Domar', 'Jaldhaka', 'Kishoreganj', 'Nilphamari Sadar', 'Saidpur'],

        noakhali: ['Begumganj', 'Bhasan Char', 'Charjabbar', 'Chatkhil', 'Companigonj', 'Hatiya', 'Kabirhat', 'Senbagh', 'Sonaimuri', 'Sudharam'],

        pabna: ['Aminpur', 'Ataikula', 'Atgharia', 'Bera', 'Bhangura', 'Chatmohar', 'Faridpur', 'Ishwardi', 'Pabna Sadar', 'Santhia', 'Sujanagar'],

        panchagarh: ['Atwari', 'Boda', 'Debiganj', 'Panchagarh Sadar', 'Tetulia'],

        patuakhali: ['Bauphal', 'Dashmina', 'Dumki', 'Galachipa', 'Kalapara', 'Mirzaganj', 'Mohipur', 'Patuakhali Sadar', 'Rangbali'],

        pirojpur: ['Bhandaria', 'Indurkani', 'Kawkhali', 'Mathbaria', 'Nazirpur', 'Nesarabad', 'Pirojpur Sadar'],

        rajbari: ['Baliakandi', 'Goalanda Ghat', 'Kalukhali', 'Pangsha', 'Rajbari'],

        rajsahi: ['Airport', 'Bagha', 'Bagmara', 'Bilpukur', 'Boalia Model', 'Chandrima', 'Chargat', 'Damkura', 'Durgapur', 'Godagari', 'Kashiadanga', 'Katakhali', 'Kornahar', 'Mohanpur', 'Motihar', 'Paba', 'Puthia', 'Rajpara', 'Shah Makhdum', 'Tanor'],

        rangamati: ['Baghaichhari', 'Barkal', 'Belaichhari', 'Chandraghona', 'Juraichhari', 'Kaptai', 'Kawkhalil (Betbunia)', 'Kotwali', 'Langadu', 'Naniarchar', 'Rajasthali', 'Sajek'],

        rangpur: ['Badarganj', 'Gangachara', 'Haragach', 'Hazirhat', 'Kaunia', 'Kotwali Metro', 'Mahigonj', 'Mitha Pukur', 'Pirgachha', 'Pirganj', 'Porshuram', 'Rangpur Sadar', 'Tajhat', 'Taraganj'],

        satkhira: ['Ashashuni', 'Debhata', 'Kalaroa', 'Kaliganj', 'Patkelghata', 'Satkhira Sadar', 'Shyamnagar', 'Tala'],

        shariatpur: ['Bhedarganj', 'Damudya', 'Gosairhat', 'Jajira', 'Naria', 'Padma Setu South', 'Palong Model', 'Shakhipur'],

        sherpur: ['Jhenaigati', 'Nakla', 'Nalitabari', 'Sherpur', 'Sribardi'],

        sirajganj: ['Bangabandhu Setu West', 'Belkuchi', 'Chowhali', 'Enayetpur', 'Kamarkhand', 'Kazipur', 'Rangonj', 'Salanga', 'Shahjadpur', 'Sirajganj', 'Tarsh', 'Ullapara Model'],

        sunamganj: ['Bishwambarpur', 'Chhatak', 'Dakshin Sunamganj', 'Derai', 'Dharampasha', 'Dowarbazar', 'Jagannathpur', 'Jamalganj', 'Madhanagar', 'Sullah', 'Sunamganj Sadar', 'Tahirpur'],

        sylhet: ['Airport', 'Balaganj', 'Beanibazar', 'Bishwanath', 'Companyganj', 'Fenchuganj', 'Golapganj', 'Goainghat', 'Jaintapur', 'Jalalabad', 'Kanaighat', 'Kotwali', 'Moglabazar', 'Osmaninagar', 'Shahporan', 'South Surma', 'Zokiganj'],

        tangail: ['Bangabandhu Setu East', 'Bangabandhu Setu East', 'Basail', 'Bhuapur', 'Delduar', 'Dhanbari', 'Ghatail', 'Gopalpur', 'Kalihati', 'Madhupur', 'Mirzapur', 'Nagarpur', 'Sakhipur', 'Tangail Sadar'],

        thakurgaon: ['Baliadang', 'Bhully', 'Haripur', 'Pirganj', 'Ranisankail', 'Ruhia', 'Thakurgaon Sadar']

    };

    // Check if the district has corresponding police stations
    if (district && policeStations[district]) {
        policeStations[district].forEach(function (station) {
            var option = document.createElement('option');
            option.value = station.toLowerCase().replace(/\s+/g, '');
            option.text = station;
            policeStationSelect.appendChild(option);
        });
    }
});



// Script for Navigation bar
let menuList = document.getElementById("menuList");
window.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth >= 768) {
        menuList.style.height = 'auto';
    } else {
        menuList.style.height = '0px';
    }
});

function toggleMenu() {
    if (menuList.style.height == "0px") {
        menuList.style.height = "auto";
    }
    else {
        menuList.style.height = "0px";
    }
}

// This function is not necessary for users but for dev mode
window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
        menuList.style.height = 'auto';
    } else {
        menuList.style.height = '0px';
    }
});
