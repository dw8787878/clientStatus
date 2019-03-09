$(function() {
   var client = ZAFClient.init();
   client.invoke('resize', { width: '100%', height: '125px' });
/* Things to do:

1. Make Hot Client appear only if it is Hot Client, otherwise, nothing.
2. Have 2 buttons, Add To Pre-Sale Team, Add to Post-Sale Team.
3. If you click on any button, have a message, these people have been added.  And also automatically add. 

*/

  /* 
   let options = {
     url: '/api/v2/tickets.json',
     type: 'GET'
   };
    
   return client.request(options).then((results) => {
     console.log("Example 1 call results:", results);
   });
   */
  //element.insertAdjacentText(position, element)

   document.getElementById("csm").insertAdjacentText('afterbegin', 'No CSM assigned')
   document.getElementById("cse").insertAdjacentText('afterbegin', 'No CSE assigned')

  client.get('ticket.requester').then((results) => {
    //console.log("results.ticket.requester:", results["ticket.requester"]["organizations"][0]["organizationFields"]["hot_client"])  
    let hot_client_flag = results["ticket.requester"]["organizations"][0]["organizationFields"]["hot_client"];
    
    if(hot_client_flag){
        //document.getElementById("hot_client").checked="checked";
    } else {
        //document.getElementById("hot_client").checked="";
    }

    //console.log("results.ticket.CSM:", results["ticket.requester"]["organizations"][0]["organizationFields"]);
    let customer_success_manager_name = results["ticket.requester"]["organizations"][0]["organizationFields"]["customer_success_manager"];
    let customer_success_manager_email = results["ticket.requester"]["organizations"][0]["organizationFields"]["csm_email"];

    if (customer_success_manager_name) {
        //document.getElementById("csm").textContent=`CSM: ${customer_success_manager_name}`
        let csmButton = document.createElement("button");
        csmButton.onclick = function () {
          client.invoke('ticket.collaborators.add', { email: customer_success_manager_email} );
        };
        csmButton.setAttribute("style", "padding: 3px");
        csmButton.innerHTML = ` Add ${customer_success_manager_name} `;
        document.getElementById("csm").innerHTML = "";
        document.getElementById("csm").insertAdjacentElement('afterbegin', csmButton);
    }

    //console.log("results.ticket.requester:", results["ticket.requester"]["organizations"][0]["organizationFields"])
    let customer_success_engineer_name = results["ticket.requester"]["organizations"][0]["organizationFields"]["post_pe"];
    let customer_success_engineer_email = results["ticket.requester"]["organizations"][0]["organizationFields"]["post_pe_email"];

    if (customer_success_manager_name) {
        //document.getElementById("cse").textContent=`CSE: ${customer_success_engineer_name}`

        let cseButton = document.createElement("button");
        cseButton.onclick = function () {
          client.invoke('ticket.collaborators.add', { email: customer_success_engineer_email} );
        };
        cseButton.setAttribute("style", "padding: 3px");
        cseButton.innerHTML = ` Add ${customer_success_engineer_name} `;
        document.getElementById("cse").innerHTML = "";
        document.getElementById("cse").insertAdjacentElement('afterbegin', cseButton);
    }

  }).catch((error) => {
      document.getElementById("hot_client").textContent=`Error retrieving hot client: ${error}`
  });

/*
  client.get('ticket.requester').then((results) =>{
    console.log("results.ticket.CSM:", results["ticket.requester"]["organizations"][0]["organizationFields"]["customer_success_manager"])
    let customer_success_manager_name = results["ticket.requester"]["organizations"][0]["organizationFields"]["customer_success_manager"];

    if (customer_success_manager_name) {
        document.getElementById("csm").textContent=`CSM: ${customer_success_manager_name}`
    }
  })
  */
});