$(function() {
   var client = ZAFClient.init();
   client.invoke('resize', { width: '100%', height: '120px' });
   
   document.getElementById("csm").insertAdjacentText('afterbegin', 'No CSM assigned');
   document.getElementById("prePE").insertAdjacentText('afterbegin', 'No pre PE assigned');
   document.getElementById("postPE").insertAdjacentText('afterbegin', 'No CSE assigned');
   document.getElementById("ae").insertAdjacentText('afterbegin', 'No AE assigned');
  
  client.get('ticket.requester').then((results) => {
    let ping = results["ticket.requester"]["organizations"][0]["organizationFields"]["ping"]; 
    let hotClient = results["ticket.requester"]["organizations"][0]["organizationFields"]["hot_client"];
        
    let pingNotification = document.createElement("div");
    let hotClientNotification = document.createElement("div");

    pingNotification.innerHTML = `${ping ? ping : '&nbsp'}`;
    hotClientNotification.innerHTML = `${hotClient ? 'Hot Client' :  '&nbsp'}`;
    
    Object.assign(pingNotification.style,{display: "inline-block", border: "1px solid black", margin: "2px", padding: "3px", width: "120px", color: "white", fontSize: "12px" });
    Object.assign(hotClientNotification.style,{display: "inline-block", border: "1px black", margin: "2px", padding: "3px", width: "120px", color: "white", fontSize: "12px" });
                
      switch (ping) {
        case 'Protect': Object.assign(pingNotification.style,{color: "white", background: "red" });
        break;
        case 'Invest': Object.assign(pingNotification.style,{color: "black", background: "yellow" });
        break;
        case 'Nurture': Object.assign(pingNotification.style,{color: "black", background: "yellow" });
        break;
        case 'Grow': Object.assign(pingNotification.style,{color: "black", background: "LawnGreen" });
        break;
        default : Object.assign(pingNotification.style,{borderStyle: "none", color: "white", background: "white" });
        break;
      }

      switch (hotClient) {
        case true: Object.assign(hotClientNotification.style,{borderStyle: "solid", color: "white", background: "red" });
        break;
        case false: Object.assign(hotClientNotification.style,{borderStyle: "none", color: "black", background: "white" });
        break;
        default : Object.assign(hotClientNotification.style,{color: "white", background: "red" });
        break;
      }
   
    document.getElementById("pingStatus").insertAdjacentElement('afterbegin', pingNotification);
    document.getElementById("hotClientStatus").insertAdjacentElement('afterbegin', hotClientNotification);
    
    let customer_success_manager_name = results["ticket.requester"]["organizations"][0]["organizationFields"]["customer_success_manager"];
    let customer_success_manager_email = results["ticket.requester"]["organizations"][0]["organizationFields"]["csm_email"];

    if (customer_success_manager_name) { 
      let csmButton = document.createElement("button");
        csmButton.onclick = function () {
          client.invoke('ticket.collaborators.add', { email: customer_success_manager_email} );
        };
        
        Object.assign(csmButton.style,{padding: "1px", margin: "1px", fontSize: "12px"});
        csmButton.innerHTML = ` Copy ${customer_success_manager_name} `;
        document.getElementById("csm").innerHTML = "";
        document.getElementById("csm").insertAdjacentElement('afterbegin', csmButton);
    }

    let post_performance_engineer_name = results["ticket.requester"]["organizations"][0]["organizationFields"]["post_pe"];
    let post_performance_engineer_email = results["ticket.requester"]["organizations"][0]["organizationFields"]["post_pe_email"];

    if (post_performance_engineer_name) { 
      let postPeButton = document.createElement("button");
        postPeButton.onclick = function () {
          client.invoke('ticket.collaborators.add', { email: post_performance_engineer_email } );
        };
        
        Object.assign(postPeButton.style,{padding: "1px", margin: "1px", fontSize: "12px"});
        postPeButton.innerHTML = ` Copy ${post_performance_engineer_name} `;
        document.getElementById("postPE").innerHTML = "";
        document.getElementById("postPE").insertAdjacentElement('afterbegin', postPeButton);
    }
 
    let pre_performance_engineer_name = results["ticket.requester"]["organizations"][0]["organizationFields"]["pre_pe"];
    let pre_performance_engineer_email = results["ticket.requester"]["organizations"][0]["organizationFields"]["pre_pe_email"];

    if (pre_performance_engineer_name) {

        let prePeButton = document.createElement("button");
        prePeButton.onclick = function () {
          client.invoke('ticket.collaborators.add', { email: pre_performance_engineer_email} );
        };
        
        Object.assign(prePeButton.style,{padding: "1px", margin: "1px", fontSize: "12px"});
        prePeButton.innerHTML = ` Copy ${pre_performance_engineer_name} `;
        document.getElementById("prePE").innerHTML = "";
        document.getElementById("prePE").insertAdjacentElement('afterbegin', prePeButton);
    }

    let account_executive_name = results["ticket.requester"]["organizations"][0]["organizationFields"]["ae"];
    let account_executive_email = results["ticket.requester"]["organizations"][0]["organizationFields"]["ae_email"];

    if (account_executive_name) {
        let aeButton = document.createElement("button");
        aeButton.onclick = function () {
          client.invoke('ticket.collaborators.add', { email: account_executive_email} );
        };
        
        Object.assign(aeButton.style,{padding: "1px", margin: "1px", fontSize: "12px"});
        aeButton.innerHTML = ` Copy ${account_executive_name} `;
        document.getElementById("ae").innerHTML = "";
        document.getElementById("ae").insertAdjacentElement('afterbegin', aeButton);
    }


  }).catch((error) => {
    document.getElementById("error").textContent=`Error retrieving ping information from ZD: ${error}`
  });

});