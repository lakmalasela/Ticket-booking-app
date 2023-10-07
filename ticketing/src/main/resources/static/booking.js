

 

        window.addEventListener("load", initialize);

        //Initializing Functions

        function initialize() {


            $('[data-toggle="tooltip"]').tooltip()

            btnAdd.addEventListener("click",btnAddMC);
            btnClear.addEventListener("click",btnClearMC);
            btnUpdate.addEventListener("click",btnUpdateMC);


            txtSearchName.addEventListener("keyup",btnSearchMC);
            movies  = httpRequest("../movie/list","GET");
            showtime  = httpRequest("../showtime/list","GET");
            seats  = httpRequest("../seat/list","GET");
            console.log(seats[0].seatcode)


            valid = "2px solid green";
            invalid = "2px solid red";
            initial = "2px solid #d6d6c2";
            updated = "2px solid #ff9900";
            active = "#90EE90";



            loadView();
            loadForm();


            changeTab('form');
        }


        function loadView() {

            //Search Area
            txtSearchName.value="";
            txtSearchName.style.background = "";

            //Table Area
            activerowno = "";
            activepage = 1;
            var query = "&searchtext=";
            loadTable(1,cmbPageSize.value,query);//&searchtext search ekak yawanawa nm query eka
        }

        function loadTable(page,size,query) {
            page = page - 1; //initialy 0 page we get;1-1 =0
            bookings = new Array();
          var data = httpRequest("/bookticket/findAll?page="+page+"&size="+size+query,"GET");
            if(data.content!= undefined) bookings = data.content; //ena data set ekeen content eka api gnna ooni
            createPagination('pagination',data.totalPages, data.number+1,paginate);
            fillTable('tblBooking',bookings,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblBooking);

            if(activerowno!="")selectRow(tblBsr,activerowno,active);

        }

        function paginate(page) {



            checkerr = getErrors();

            if(oldbooking == null && addvalue == ""){ //if the error has addvalue =1
                activepage=page;
                activerowno=""
                loadSearchedTable();
                loadForm();

            }else{
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        activepage=page;
                        activerowno=""
                        loadSearchedTable();
                        loadForm();
                    }

                });
            }


        }

        function viewitem(bsr,rowno) {

            bsr = JSON.parse(JSON.stringify(bsr));

            tdprocode.innerHTML = bsr.province_id.code;
            tdyear.innerHTML = bsr.year;
            tdcode.innerHTML = bsr.bsrcode;
            tdname.innerHTML = bsr.bsrname;
            tdstatrdate.innerHTML = bsr.startdate;
            tdenddate.innerHTML = bsr.enddate;
            tdaddeddate.innerHTML = bsr.addeddate;



            if(bsr.description == null){
                tddescription.innerHTML = "<p style='color: red;font-size: 15px;'>No Description Added</p>"
            }else{
                tddescription.innerHTML = bsr.description;
            }





            // if(employee.photo==null)
            //     tdphoto.src= 'resourse/image/noimage.png';
            //  else
            // tdphoto.src = atob(employee.photo);
            tdstatus.innerHTML = bsr.bsrstatus_id.name;
            tdaddedby.innerHTML = bsr.employee_id.callingname;


            fillInnerTable("tblInnerrowprint", bsr.bsrHasBSRsubcategoryList,innerModify,innerDelete,innerView);

            // if(bsr.bsrHasBSRsubcategoryList.length !=0){
            //     for(index in bsr.bsrHasBSRsubcategoryList){
            //         tblInnerrowprint.children[1].children[index].lastChild.children[0].style.display = "none";
            //     }
            // }



            $('#dataviewModal').modal('show');


         }

         function btnPrintRowMC(){

             var format = printformtable.outerHTML;

             // var newwindow=window.open();
             // newwindow.document.write("<html>" +
             //     "<head><style type='text/css'>.google-visualization-table-th {text-align: left;}</style>" +
             //     "" +
             //     "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/>"+
             //     "</head>" +
             //     "<body><div style='margin-top: 150px'><h1><img class='cnew' src='../resources/image/cnew.jpg'><span>BSR Details :</span> </h1></div>" +
             //     "<div>"+format+"</div>" +
             //     "<script>printformtable.removeAttribute('style')</script>" +
             //     "</body></html>");
             // setTimeout(function () {newwindow.print(); newwindow.close();},100);
             var newwindow=window.open();
             newwindow.document.write("<html>" +
                 "<head><style type='text/css'>.google-visualization-table-th {text-align: left;}</style>" +
                 "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/>"+
                 "</head>" +
                 "<body><div style='margin-top: 150px'><div class='row'><div class='col-md-8'><div class='row'><div class='col-md-3 text-right'><img class='cnew' src='../resources/image/cnew.jpg'></div><div class='col-md-9'><h1><span>Construction Of Ceylon Engineering</span></h1></div></div></div><div class='col-md-4 text-right'><address style='font-weight: 600'>Construction of Ceylon Engineering<br>\n" +
                 "16/C Aviriya Rd,<br>\n" +
                 "Alubomulla,<br>\n" +
                 "Panadura.\n" +
                 "<h6>Tel: 0777343425|0777353526</h6>"+
                 "</address></div></div></di><hr> <h1>BSR Details :</h1></div>" +
                 "<div>"+format+"</div>" +
                 "<script>printformtable.removeAttribute('style')</script>" +
                 "</body></html>");
             setTimeout(function () {newwindow.print(); newwindow.close();},100);

         }

        function loadForm() {
            booking = new Object();
            oldbooking = null;

            booking.bookinghasseatList = new Array();

           let nextnumber = httpRequest("../bookticket/nextnumber","GET");
            txtbookno.value = nextnumber.bookid;
            booking.bookid = txtbookno.value;
            txtbookno.style.border = valid;


            fillCombo(cmbmovie,"Select the Movie",movies,"name","");
            fillCombo(cmbshowingtime,"Select the Time",showtime,"time","");

            txtbookingdatetime.value = getCurrentDateTime('datetime');
            booking.bookingdatetime =    txtbookingdatetime.value;
            txtbookingdatetime.style.border = valid;

            txtname.value = "";



            var numRows = 4;
            var numCols = 5;
            var buttonGrid = document.getElementById('button-grid');

            count = 0;
            for(let i = 1; i <= 4; i++) {
                for(let j = 1; j <= 5; j++) {


                    (function () {
                        var seat = seats[count];
                        var button = document.createElement('button');

                        button.className = 'btn btn-primary m-3 recived';
                        button.textContent = seat.seatcode;

                        recivedseat = 0;

                        button.addEventListener('click', function () {
                            buttonClickHandler(seat);


                        });



                        buttonGrid.appendChild(button);
                        count++;

                        if (count >= seats.length) {
                            return;
                        }
                    })();


                }

                var breaking = document.createElement('br');
                buttonGrid.appendChild(breaking)

            }






            refreshInnerForm();
        }

        function refreshInnerForm(){
            Bookinghasseat = new Object();
            oldBookinghasseat = null;



            // btnInnerUpdate.disabled = true;
            // btnInnerAdd.disabled = false;
            //
            // btnInnerUpdate.style.cursor = "not-allowed";
            // btnInnerAdd.style.cursor ="pointer";
            //


            // if(bsr.bsrHasBSRsubcategoryList.length !=0){
            //     for(index in bsr.bsrHasBSRsubcategoryList){
            //         tblInnersubtask.children[1].children[index].lastChild.children[0].style.display = "none";
            //     }
            // }

            fillInnerTable("tblInnerbookseat", booking.bookinghasseatList,innerModify,innerDelete,true);

        }

        function disableseatButtons() {
            var buttons = document.getElementsByClassName('recived');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
                buttons[i].classList.add('disabled-button');
            }
        }

        var clicks = 0;
        var maxClicks = 5; // Maximum number of allowed clicks

        function buttonClickHandler(seat) {

            if (clicks < maxClicks) {
                Bookinghasseat.seat_id = seat;
                clicks++;




                var recievedseat = false;



                for(index in booking.bookinghasseatList){




                    if(booking.bookinghasseatList[index].seat_id.seatcode == Bookinghasseat.seat_id.seatcode ){
                        recievedseat = true;

                        console.log("uuybu ",booking.bookinghasseatList[index].seat_id.seatcode)
                        console.log("uuybu ",Bookinghasseat.seat_id.seatcode)
                        break;


                    }
                }

                if(recievedseat){
                    swal({
                        title: "The Seat All Ready Book...!",
                        text: "\n",
                        icon: "warning",
                        buttons: false,
                        timer: 1500,
                    });
                    refreshInnerForm();

                }else{

                    console.log("CLICK ",clicks)

                    swal({
                        title: "Are you sure Book the Seat...?",
                        text: "Add Following Details ... \n" +

                            "\n Category : " + Bookinghasseat.seat_id.seatcode,


                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then((willDelete) => {
                        if (willDelete) {
                            swal({
                                title: "Save Successfully...!",
                                text: "\n",
                                icon: "success",
                                buttons: false,
                                timer: 1500,
                            });



                            booking.bookinghasseatList.push(Bookinghasseat);
                            var totalprice = 800;
                            totalprice *=clicks;
                            txtprice.value = parseFloat(totalprice).toFixed(2);
                            booking.price = txtprice.value;
                            txtprice.style.border = valid;
                            console.log("PRICE ",totalprice)



                            refreshInnerForm();

                        }
                    });



                }




                if (clicks === maxClicks) {

                    disableseatButtons();
                    console.log('All buttons are disabled.');
                }
            }
        }
        function innerModify(ob,innerrowno){
           innerrow = innerrowno;

            // console.log(innerrow);
            BSRHasBSRsubcategory = JSON.parse(JSON.stringify(ob));
            oldBSRHasBSRsubcategory = JSON.parse(JSON.stringify(ob));

            //disable buttons
            btnInnerUpdate.disabled = false;
            btnInnerAdd.disabled = true;

            btnInnerUpdate.style.cursor = "pointer";
            btnInnerAdd.style.cursor ="not-allowed";

            // console.log(BSRHasBSRsubcategory);
            // console.log(oldBSRHasBSRsubcategory);

            var catfill =  BSRHasBSRsubcategory.bsrsubcategory_id.bsrcategory_id.name;
            cmdCategory.disabled = true;
            fillCombo(cmdCategory,"Select the BSR Category",bsrcategory,"name",catfill);

            fillCombo(cmdSubCategory,"Select the BSR Sub Category",bsrsubcategory,"name",BSRHasBSRsubcategory.bsrsubcategory_id.name);
            cmdSubCategory.disabled=true;

            itemCode.value = BSRHasBSRsubcategory.itemcode;
            itemCode.disabled = true;
            itemCode.style.border=valid;

            //subCatDescription.disabled=true;
            subCatDescription.value = BSRHasBSRsubcategory.description;
            subCatDescription.style.border=valid;

            fillCombo(cmditemUnit,"Select the Item Unit",itemunits,"name",BSRHasBSRsubcategory.itemunit_id.name);
            cmditemUnit.disabled=true;

            //console.log(BSRHasBSRsubcategory.bsrrate);

           bsrRate.value = parseFloat(BSRHasBSRsubcategory.bsrrate).toFixed(2);
           // bsrRate.value = BSRHasBSRsubcategory.bsrrate;
            bsrRate.style.border=valid;



        }

        function getInnerUpdate(){

            var innerupdate = "";

            if(BSRHasBSRsubcategory != null && oldBSRHasBSRsubcategory != null ){
                console.log(typeof BSRHasBSRsubcategory.bsrrate);
                console.log(typeof oldBSRHasBSRsubcategory.bsrrate);

                if (BSRHasBSRsubcategory.bsrrate != oldBSRHasBSRsubcategory.bsrrate)
                    innerupdate = innerupdate + "\nBSR Rate is Changed.." + parseFloat(oldBSRHasBSRsubcategory.bsrrate).toFixed(2) + " into " + parseFloat(BSRHasBSRsubcategory.bsrrate).toFixed(2);


                if (BSRHasBSRsubcategory.description != oldBSRHasBSRsubcategory.description)
                    innerupdate = innerupdate + "\nBSR Rate is Changed.." +BSRHasBSRsubcategory.description;

            }
            return innerupdate;


        }

        function getInnerErrors(){
            var innerErrors = "";
            var inneraddvalue = "";

            if(cmdCategory.value == ""){
                innerErrors = innerErrors+"\n" +"Select the BSR Category";
                cmdCategory.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(BSRHasBSRsubcategory.bsrsubcategory_id == null){
                innerErrors = innerErrors+"\n" +"Select the BSR Sub Category";
                cmdSubCategory.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(BSRHasBSRsubcategory.itemcode == null){
                innerErrors = innerErrors +"\n" +"Enter the Item Code";
                itemCode.style.border = invalid;
            }else
                inneraddvalue = 1;
            if(BSRHasBSRsubcategory.description == null){
                innerErrors = innerErrors +"\n"+"Enter the BSR Description";
                subCatDescription.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(BSRHasBSRsubcategory.itemunit_id == null){
                innerErrors = innerErrors+"\n" +"Enter the Item Unit";
                cmditemUnit.style.border = invalid;
            }else
                inneraddvalue = 1;

            if(BSRHasBSRsubcategory.bsrrate == null){
                innerErrors = innerErrors+"\n" +"Enter the Item Unit";
                bsrRate.style.border = invalid;
            }else
                inneraddvalue = 1;

            return innerErrors;
        }

        function btnInnerUpdateMC(){
            // bsr.bsrHasBSRsubcategoryList[innerrow] = BSRHasBSRsubcategory;
            // refreshInnerForm();
            var innerErrors = getInnerErrors();
            if(innerErrors == ""){
                var innerUpdate = getInnerUpdate();
                if(innerUpdate == ""){
                    swal({
                        title: 'Nothing Updated..!', icon: "warning",
                        text: '\n',
                        button: false,
                        timer: 1200
                    });
                }else{
                    swal({
                        title: "Are you sure to Inner Form update following details...?",
                        text: "\n" + innerUpdate,
                        icon: "warning", buttons: true, dangerMode: true,
                    })


                        .then((willDelete) => {
                            if (willDelete) {

                                swal({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Your work has been Done \n Update SuccessFully..!',
                                    text: '\n',
                                    button: false,
                                    timer: 1200
                                });
                               // console.log(innerrow);
                                bsr.bsrHasBSRsubcategoryList[innerrow] = BSRHasBSRsubcategory;

                                console.log(bsr.bsrHasBSRsubcategoryList[innerrow])
                                refreshInnerForm();
                                // console.log("New List", bsr.bsrHasBSRsubcategoryList);
                                // console.log("Old List", oldbsr.bsrHasBSRsubcategoryList);
                                //console.log(bsr.bsrHasBSRsubcategoryList == oldbsr.bsrHasBSRsubcategoryList);

                            }
                        });



                }
            }else{
                swal({
                    title: 'You have following errors in your form', icon: "error",
                    text: '\n ' + getInnerErrors(),
                    button: true
                });
            }

        }





        function innerDelete( BSRHasBSRsubcategory,rowno){

            swal({
                title: "Are you sure...?",
                text: "Delete Following BSR Sub Task ... \n" +
                    "BSR Category name : " + BSRHasBSRsubcategory.bsrsubcategory_id.bsrcategory_id.name,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    swal({
                        title: "Delete Successfully...!",
                        text: "\n",
                        icon: "success",
                        buttons: false,
                        timer: 1500,
                    });

                    bsr.bsrHasBSRsubcategoryList.splice(rowno, 1);
                    refreshInnerForm();


                }
            });


        }
        function innerView(){

        }

        function cmbCategoryCH(){
            cmdCategory.style.border = valid;
            bsrsubcategoriesbycategory = httpRequest("bsrsubcategory/listbycategory?categoryid="+JSON.parse(cmdCategory.value).id,"GET")

            fillCombo(cmdSubCategory,"Select the BSR Sub Category",bsrsubcategoriesbycategory,"name","");
           // cmdSubCategory.style.border = valid;
            fillCombo(cmditemUnit,"Select the Item Unit",itemunits,"name","");
           //  if(bsrHasBSRsubcategory.bsrsubcategory_id== null){
           //      cmdSubCategory.disabled = true;
           //  }
            subCatDescription.value ="";
            bsrRate.value = "";

            BSRHasBSRsubcategory.bsrsubcategory_id = null;
            BSRHasBSRsubcategory .description = null;
            BSRHasBSRsubcategory .bsrrate = null;

            cmdSubCategory.style.border = initial;
            itemCode.style.border = initial;
            subCatDescription.style.border = initial;
            cmditemUnit.style.border = initial;
            bsrRate.style.border = initial;
            //item code bind
            itemCode.value = JSON.parse(cmdCategory.value).code;

        }

        function setStyle(style) {

            cmdProcode.style.border = style;
           bsrYear.style.border = style;
            bsrCode.style.border = style;
            bsrName.style.border = style;
            StartDate.style.border = style;
            endDate.style.border = style;
            //bsrDescription.style.border = style;

            //cusDescription.style.border = style;

        }

        function disableButtons(add, upd, del) {

            if (add || !privilages.add) {
                btnAdd.setAttribute("disabled", "disabled");
                $('#btnAdd').css('cursor','not-allowed');
            }
            else {
                btnAdd.removeAttribute("disabled");
                $('#btnAdd').css('cursor','pointer')
            }

            if (upd || !privilages.update) {
                btnUpdate.setAttribute("disabled", "disabled");
                $('#btnUpdate').css('cursor','not-allowed');
            }
            else {
                btnUpdate.removeAttribute("disabled");
                $('#btnUpdate').css('cursor','pointer');
             }

            if (!privilages.update) {
                $(".buttonup").prop('disabled', true);
                $(".buttonup").css('cursor','not-allowed');
            }
            else {
                $(".buttonup").removeAttr("disabled");
                $(".buttonup").css('cursor','pointer');
            }

            if (!privilages.delete){
                $(".buttondel").prop('disabled', true);
                $(".buttondel").css('cursor','not-allowed');
            }
            else {
                $(".buttondel").removeAttr("disabled");
                $(".buttondel").css('cursor','pointer');
            }

            // select deleted data row
            for(index in bsrs){
                if(bsrs[index].bsrstatus_id.name =="Deleted"){
                    tblBsr.children[1].children[index].style.color = "#f00";
                    tblBsr.children[1].children[index].style.border = "2px solid red";
                    tblBsr.children[1].children[index].lastChild.children[1].disabled = true;
                    tblBsr.children[1].children[index].lastChild.children[1].style.cursor = "not-allowed";

                }
            }

        }

        function nicTestFieldBinder(field,pattern,ob,prop,oldob) {
            var regpattern = new RegExp(pattern);

            var val = field.value.trim();
            if (regpattern.test(val)) {
                    var dobyear, gendername,noOfDays = "";
                    if (val.length===10){
                        dobyear = "19"+val.substring(0,2);
                        noOfDays = val.substring(2,5);
                    }else{
                         dobyear = val.substring(0,4);
                         noOfDays = val.substring(4,7);
                    }
                    birthdate = new Date(dobyear+"-"+"01-01");
                if (noOfDays>=1 && noOfDays<=366){
                    gendername =  "Male";
                }else if(noOfDays>=501 && noOfDays<=866){
                    noOfDays = noOfDays-500;
                    gendername =  "Female";
                }
                if(gendername=== "Female" ||  gendername ===  "Male"){
                    fillCombo(cmbGender,"Select Gender",genders,"name",gendername);
                    birthdate.setDate(birthdate.getDate()+parseInt(noOfDays)-1)
                    dteDOBirth.value = birthdate.getFullYear()+"-"+getmonthdate(birthdate);

                    employee.genderId = JSON.parse(cmbGender.value);
                    employee.dobirth = dteDOBirth.value;
                    employee.nic = field.value;
                    if (oldemployee != null && oldemployee.nic != employee.nic){
                        field.style.border=updated;}else {field.style.border=valid;}
                    if (oldemployee != null && oldemployee.dobirth != employee.dobirth){
                        dteDOBirth.style.border=updated;}else {dteDOBirth.style.border=valid;}
                    if (oldemployee != null && oldemployee.genderId.name != employee.genderId.name){
                        cmbGender.style.border=updated;}else {cmbGender.style.border=valid;}
                    dteDOBirthCH();
                }else{
                    field.style.border = invalid;
                    cmbGender.style.border = initial;
                    dteDOBirth.style.border = initial;
                    fillCombo(cmbGender,"Select Gender",genders,"name","");
                    dteDOBirth.value = "";
                        employee.nic = null;
                }
            }else{
                field.style.border = invalid;
                employee.nic = null;
            }

        }

        function nicFieldBinder(field,pattern,ob,prop,oldob) {
            var regpattern = new RegExp(pattern);
    
            var val = field.value.trim();
            if (regpattern.test(val)) {
                employee.nic = val;
                if (oldemployee != null && oldemployee.nic != employee.nic){
                    field.style.border = updated;
                    gender = generate(val,field,cmbGender,dteDOBirth);
                   fillCombo(cmbGender,"Select Gender",genders,"name",gender);
                   cmbGender.style.border=updated;
                    dteDOBirth.style.border=updated;
                    employee.genderId = JSON.parse(cmbGender.value);
                    employee.dobirth = dteDOBirth.value;
                }else{
                    field.style.border = valid;
                    gender =  generate(val,field,cmbGender,dteDOBirth);
                    fillCombo(cmbGender,"Select Gender",genders,"name",gender);
                    cmbGender.style.border=valid;
                    dteDOBirth.style.border=valid;
                    employee.genderId = JSON.parse(cmbGender.value);
                    employee.dobirth = dteDOBirth.value;
                }
            }
            else {
                field.style.border = invalid;
                employee.nic = null;
            }
        }

        function dteDOBirthCH() {
            var today = new Date();
            var birthday = new Date(dteDOBirth.value);
            if((today.getTime()-birthday.getTime())>(18*365*24*3600*1000)) {
                employee.dobirth = dteDOBirth.value;
                dteDOBirth.style.border = valid;
            }
            else
            {
                employee.dobirth = null;
                dteDOBirth.style.border = invalid;
            }
        }

        function getErrors() {

            var errors = "";
            addvalue = "";


            if (booking.customername == null) {
                txtname.style.border = invalid;
                errors = errors + "\n" + "Ented the Name";

            }else  addvalue = 1;

            if(booking.movie_id ==null){
                cmbmovie.style.border = invalid;
                errors = errors + "\n" + "Select the Movie";
            }else{
                addvalue = 1;
            }

            if (booking.showingtime_id == null){
                cmbshowingtime.style.border = invalid;
                errors = errors + "\n" + "Select the Booking Time";
            }
            else  addvalue = 1;



            if (booking.bookinghasseatList.length  == 0){
                //getInnerErrors();
                errors = errors + "\n" + "Seat Not Book";
            }

            else  addvalue = 1;



            return errors;

        }

        function btnAddMC(){
            if(getErrors()==""){
                savedata();
            }else{
                swal({
                    title: "You have following errors",
                    text: "\n"+getErrors(),
                    icon: "error",
                    button: true,
                });

            }
        }
        
        function savedata() {

            swal({
                title: "Are you sure to add following customer...?" ,
                text :
                    "\nBook Number : " + booking.bookid +
                    "\nName : " + booking.customername +
                    "\nTicket Price : " + booking.price +
                    "\nMovie Name : " + booking.movie_id.name +
                    "\nBooked Time: " + booking.showingtime_id.time ,


                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    var response = httpRequest("/bookticket", "POST", booking);
                    if (response == "0") {
                        swal({
                            position: 'center',
                            icon: 'success',
                            title: 'Your work has been Done \n Save SuccessFully..!',
                            text: '\n',
                            button: false,
                            timer: 1200
                        });
                        activepage = 1;
                        activerowno = 1;
                        loadSearchedTable();
                        loadForm();
                        changeTab('table');
                    }
                    else swal({
                        title: 'Save not Success... , You have following errors', icon: "error",
                        text: '\n ' + response,
                        button: true
                    });
                }
            });

        }

        function btnClearMC() {
            //Get Cofirmation from the User window.confirm();
            checkerr = getErrors();

            if(oldbsr == null && addvalue == ""){ //if the error has addvalue =1
                loadForm();
            }else{
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        loadForm();
                    }

                });
            }

        }

        function fillForm(bsr,rowno){
            activerowno = rowno;

            if (oldbsr==null) {
                filldata(bsr);
            } else {
                swal({
                    title: "Form has some values, updates values... Are you sure to discard the form ?",
                    text: "\n" ,
                    icon: "warning", buttons: true, dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        filldata(bsr);
                    }

                });
            }

        }


        function filldata(bsrs) {
            clearSelection(tblBsr);
            selectRow(tblBsr,activerowno,active);

            bsr = JSON.parse(JSON.stringify(bsrs));
            oldbsr = JSON.parse(JSON.stringify(bsrs));

            bsrYear.value = bsr.year;

            bsrCode.value = bsr.bsrcode;
            bsrCode.disabled="disabled";
            bsrName.value = bsr.bsrname;
            StartDate.value = bsr.startdate;
            endDate.value = bsr.enddate;
            addedDate.value = bsr.addeddate;

            console.log(bsr.addeddate);
            //console.log("BSR DESCRIPTION",bsr.description);


            if(bsr.description == null){
                bsrDescription.value = "No Description Added";
                //bsrDescription.style.border = initial;
            }else {
                bsrDescription.value = bsr.description;
                bsrDescription.style.border = valid;
            }




            fillCombo(cmdProcode,"Select the Province Code",provinces,"code",bsr.province_id.code);
            //
            fillCombo(cmdaddedBy,"Select Civil Status",employees,"callingname",bsr.employee_id.callingname);
            fillCombo(cmdbsrStatus,"Select the BSR Status",bsrstatus,"name",bsr.bsrstatus_id.name);

            //console.log(oldbsr.bsrHasBSRsubcategoryList.bsrsubcategory_id);

            getBSRcode();

            //setDefaultFile('flePhoto', employee.photo);

            // disableButtons(true, false, false);
            setStyle(valid);
            refreshInnerForm();
            changeTab('form');

        }


    function btnInnerAddMC(){
            var innerErrors = getInnerErrors();

            if(innerErrors == ""){
                saveInnerData();

            }else{
                swal({
                    title: "You don't fill some feilds...!",
                    text: innerErrors,
                    icon: "warning",
                    buttons: true,

                });
            }

    }

    function saveInnerData(){
            var subCategoryList = false;

            for(index in  bsr.bsrHasBSRsubcategoryList){
                if(bsr.bsrHasBSRsubcategoryList[index].itemcode == BSRHasBSRsubcategory.itemcode){
                    subCategoryList = true;
                    break;
                }
            }

            if(subCategoryList){
                swal({
                    title: " Allready Exisit...!",
                    text: "\n",
                    icon: "warning",
                    buttons: false,
                    timer: 1500,
                });
                refreshInnerForm();

            }else{


                swal({
                    title: "Are you sure...?",
                    text: "Add Following Details ... \n" +

                        "\n Category : " + JSON.parse(cmdCategory.value ).name+
                        "\n Sub Category : " + BSRHasBSRsubcategory.bsrsubcategory_id.name +
                        "\n Item Code : " + BSRHasBSRsubcategory.itemcode +
                        "\n Description : " + BSRHasBSRsubcategory.description +
                        "\n Item Unit : " + BSRHasBSRsubcategory.itemunit_id.name +
                        "\n BSR Rate : " + BSRHasBSRsubcategory.bsrrate ,




                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        swal({
                            title: "Save Successfully...!",
                            text: "\n",
                            icon: "success",
                            buttons: false,
                            timer: 1500,
                        });



                        bsr.bsrHasBSRsubcategoryList.push(BSRHasBSRsubcategory);
                        console.log(BSRHasBSRsubcategory);
                        refreshInnerForm();


                    }
                });
            }

    }
    function btnInnerClearMC(){
        swal({
            title: "Are you sure To Clear the Form...?",
            text: " \n",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                refreshInnerForm();

            }
        });
    }


        function getUpdates() {

            var updates = "";

            if(bsr!=null && oldbsr!=null) {


                if (bsr.province_id.code != oldbsr.province_id.code)
                    updates = updates + "\nBSR Province Code is Change.." +oldbsr.province_id.code +" into " +bsr.province_id.code ;

                if (bsr.year != oldbsr.year)
                    updates = updates + "\nBSR Year is Changed.." + oldbsr.year +" into "+bsr.year ;

                if (bsr.bsrcode != oldbsr.bsrcode)
                    updates = updates + "\nBSR Code is Changed.." + oldbsr.bsrcode + " into "+ bsr.bsrcode;

                if (bsr.bsrname != oldbsr.bsrname)
                    updates = updates + "\nBSR Name is Changed.." +oldbsr.bsrname+ " into "+bsr.bsrname;


                // if (bsr.photo != oldbsr.photo)
                //     updates = updates + "\nPhoto is Changed";

                if (bsr.startdate != oldbsr.startdate)
                    updates = updates + "\nBSR Statrt Date is Changed.."+ oldbsr.startdate+ " into " +bsr.startdate;

                if (bsr.enddate != oldbsr.enddate)
                    updates = updates + "\nBSR End Date is Changed.."+oldbsr.enddate+ " into "+bsr.enddate  ;

                if (bsr.description != oldbsr.description)
                    updates = updates + "\nBSR Description is Changed.."+ oldbsr.description+ " into "+bsr.description;

                if (bsr.bsrstatus_id.name != oldbsr.bsrstatus_id.name)
                    updates = updates + "\nBSR Status is Changed.."+ oldbsr.bsrstatus_id.name+ " into "+bsr.bsrstatus_id.name;

                if(isEqual(bsr.bsrHasBSRsubcategoryList,oldbsr.bsrHasBSRsubcategoryList,'bsrsubcategory_id')){
                    console.log("New ",bsr.bsrHasBSRsubcategoryList);
                    console.log("Old",oldbsr.bsrHasBSRsubcategoryList);
                    updates = updates + "\nBSR Sub Category is Changed..";
                }
                //console.log(bsr.bsrHasBSRsubcategoryList == oldbsr.bsrHasBSRsubcategoryList);
                // if(bsr.bsrHasBSRsubcategoryList.length !=oldbsr.bsrHasBSRsubcategoryList.length)
                //     updates = updates + "\nBSR Sub Category is Changed..";

            }

            return updates;

        }

        function btnUpdateMC() {
            var errors = getErrors();
            if (errors == "") {
                var updates = getUpdates();
                if (updates == "")
                    swal({
                    title: 'Nothing Updated..!',icon: "warning",
                    text: '\n',
                    button: false,
                    timer: 1200});
                else {
                    swal({
                        title: "Are you sure to update following BSR details...?",
                        text: "\n"+ updates,
                        icon: "warning", buttons: true, dangerMode: true,
                    })
                        .then((willDelete) => {
                        if (willDelete) {
                            var response = httpRequest("/bsr", "PUT", bsr);
                            if (response == "0") {
                                swal({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Your work has been Done \n Update SuccessFully..!',
                                    text: '\n',
                                    button: false,
                                    timer: 1200
                                });
                                loadSearchedTable();
                                loadForm();
                                changeTab('table');

                            }
                            else
                                swal({
                                    title: "Failed to add...!",icon: "error",
                                    text: 'You have following errors\n'+ response,
                                    buttons: true
                                });
                        }
                        });
                }
            }
            else
                swal({
                    title: 'You have following errors in your form',icon: "error",
                    text: '\n '+getErrors(),
                    button: true});

        }

        function btnDeleteMC(bsr) {
            bsr = JSON.parse(JSON.stringify(bsr));

            swal({
                title: "Are you sure to delete following customer...?",
                text: "\n Employee Number : " + bsr.bsrcode  +
                "\n Employee Fullname : " + bsr.bsrname,
                icon: "warning", buttons: true, dangerMode: true,
            }).then((willDelete)=> {
                if (willDelete) {
                    var responce = httpRequest("/bsr","DELETE",bsr);
                    if (responce==0) {
                        swal({
                            title: "Deleted Successfully....!",
                            text: "\n\n  Status change to delete",
                            icon: "success", button: false, timer: 1200,
                        });
                        loadSearchedTable();
                        loadForm();
                    } else {
                        swal({
                            title: "You have following erros....!",
                            text: "\n\n" + responce,
                            icon: "error", button: true,
                        });
                    }
                }
            });

       }

        function loadSearchedTable() {

            var searchtext = txtSearchName.value;

            var query ="&searchtext=";

            if(searchtext!="")
                query = "&searchtext=" + searchtext;
            //window.alert(query);
            loadTable(activepage, cmbPageSize.value, query);
            //disableButtons(false, true, true);

        }

        function btnSearchMC(){
            activepage=1;
            loadSearchedTable();
        }

        function btnSearchClearMC(){
               loadView();
        }

       function btnPrintTableMC(bsr) {

            var newwindow=window.open();
            formattab = tblBsr.outerHTML;

           newwindow.document.write("" +
                "<html>" +
                "<head><style type='text/css'>.google-visualization-table-th {text-align: left;} .modifybutton{display: none} .isort{display: none}</style>" +
                "<link rel='stylesheet' href='../resources/bootstrap/css/bootstrap.min.css'/></head>" +
                "<body><div style='margin-top: 150px; '> <h1><img class='cnew' src='../resources/image/cnew.jpg'><span>BSR Details :</span></h1></div>" +
                "<div>"+ formattab+"</div>"+
               "</body>" +
                "</html>");
           setTimeout(function () {newwindow.print(); newwindow.close();},100) ;
        }

        function sortTable(cind) {
            cindex = cind;

         var cprop = tblEmployee.firstChild.firstChild.children[cindex].getAttribute('property');

           if(cprop.indexOf('.') == -1) {
               employees.sort(
                   function (a, b) {
                       if (a[cprop] < b[cprop]) {
                           return -1;
                       } else if (a[cprop] > b[cprop]) {
                           return 1;
                       } else {
                           return 0;
                       }
                   }
               );
           }else {
               employees.sort(
                   function (a, b) {
                       if (a[cprop.substring(0,cprop.indexOf('.'))][cprop.substr(cprop.indexOf('.')+1)] < b[cprop.substring(0,cprop.indexOf('.'))][cprop.substr(cprop.indexOf('.')+1)]) {
                           return -1;
                       } else if (a[cprop.substring(0,cprop.indexOf('.'))][cprop.substr(cprop.indexOf('.')+1)] > b[cprop.substring(0,cprop.indexOf('.'))][cprop.substr(cprop.indexOf('.')+1)]) {
                           return 1;
                       } else {
                           return 0;
                       }
                   }
               );
           }
            fillTable('tblEmployee',employees,fillForm,btnDeleteMC,viewitem);
            clearSelection(tblEmployee);
            loadForm();

            if(activerowno!="")selectRow(tblEmployee,activerowno,active);



        }