window.onload = function(e){
  var tbody=document.getElementById('tbody');
  fetch(`http://localhost:5000`)
  .then(res => res.json())
  .then(data =>{
    console.log(data)
    for(let i=0;i<data.items.length;i++){
      var tr=document.createElement("tr");
      var td1=document.createElement("td");
      var txt1=document.createTextNode(data.items[i]['employeeCode']);
      td1.appendChild(txt1);
      var td2=document.createElement("td");
      var txt2=document.createTextNode(data.items[i]['dateOfJoining']);
      td2.appendChild(txt2);
      var td3=document.createElement("td");
      var txt3=document.createTextNode(data.items[i]['paymentMonth']);
      td3.appendChild(txt3);
      var td4=document.createElement("td");
      var txt4=document.createTextNode(data.items[i]['accountNumber']);
      td4.appendChild(txt4);
      var td5=document.createElement("td");
      var txt5=document.createTextNode(data.items[i]['name']);
      td5.appendChild(txt5);
      var td6=document.createElement("td");
      var txt6=document.createTextNode(data.items[i]['email']);
      td6.appendChild(txt6);
      var td7=document.createElement("td");
      var txt7=document.createTextNode(data.items[i]['designation']);
      td7.appendChild(txt7);
      var td8=document.createElement("td");
      var txt8=document.createTextNode(data.items[i]['department']);
      td8.appendChild(txt8);
      var td9=document.createElement("td");
      var txt9=document.createTextNode(data.items[i]['amount']);
      td9.appendChild(txt9);
      var td10=document.createElement("td");
      var txt10=document.createTextNode(data.items[i]['modeTransaction']);
      td10.appendChild(txt10);
      var td11=document.createElement("td");
      var txt11=document.createTextNode(data.items[i]['currentDate']);
      td11.appendChild(txt11);
      var td12=document.createElement("td");
      var txt12=document.createTextNode(data.items[i]['paymentStatus']);
      td12.appendChild(txt12);
      var td13=document.createElement("td");
      var txt13=document.createTextNode(data.items[i]['issuerName']);
      td13.appendChild(txt13);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tr.appendChild(td7);
      tr.appendChild(td8);
      tr.appendChild(td9);
      tr.appendChild(td10);
      tr.appendChild(td11);
      tr.appendChild(td12);
      tr.appendChild(td13);
      tbody.appendChild(tr);
    }
  }).catch((e)=>console.log(e))
}

const addCSV=(e)=>{
  e.preventDefault()
  const input = document.getElementById('fileinput');
  console.log(input.files[0]);
  var formData = new FormData()
  formData.append('file', input.files[0])
  fetch('http://localhost:5000', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
  .then(data => {
    alert("CSV uploaded successfully");
    window.location.reload();
  })
  .catch((e)=>console.log(e))
}

document.getElementById('upload_form').addEventListener('submit',addCSV)