                        <div className="row">
                          <div className="form-group" style={{display:"table"}}>
                            <div className="col-md-12" style={{marginTop:"10px" }}>
                              <div className="col-md-1">
                                <label>{ item.typeOfTransport }</label>
                              </div>
                              <div className="col-md-4">
                                {console.log("txTimeStamp ========== ", item.txTimeStamp)}
                                <label style={{ fontWeight:"normal"}}> ({moment.unix(item.txTimeStamp/1000).format("DD/MM/YYYY HH:mm:ss")})</label>
                              </div>
                            </div>
                            <div className="col-md-12">
                               <div className="col-md-2">
                                <label>Transaction Id: </label>
                              </div>
                              <div className="col-md-12" style={{overflowWrap: "anywhere"}}>
                                <label>{ item.txID }</label>
                              </div>
                            </div>
                          </div> 
                          <div className="col-md-12">
                            <div className="col-md-2">
                                <label>{utils.getLabelByID('Master_Transport_Doc_')}</label>
                            </div>
                            <div className="col-md-2">
                                <label style={{ fontWeight:"normal"}}> {item.masterTransportNo}</label>
                            </div>
                            
                            <div className="col-md-2">
                                <label>{utils.getLabelByID('House_Transport_Doc_')}</label>
                            </div>
                            <div className="col-md-2">
                                <label style={{ fontWeight:"normal"}}>{item.houseTransportNo}</label>
                            </div>

                            <div className="col-md-2" style={ item.typeOfTransport === "RETURN" ? {display:""} : {display:"none"}}>
                                <label>{utils.getLabelByID('Old_House_Transport_Doc_')}</label>
                            </div>
                            <div className="col-md-2" style={ item.typeOfTransport === "RETURN" ? {display:""} : {display:"none"}}>
                                <label style={{ fontWeight:"normal"}}>  {item.houseTransportNo}</label>
                            </div>
                          </div>
                          
                          <div className="col-md-12" style={ item.typeOfTransport === "RETURN" ? {display:""} : {display:"none"}} >
                            <div className="col-md-2">
                              <label>{utils.getLabelByID('Return_Reason_')}</label>
                            </div>
                            <div className="col-md-10">
                              <label style={{ fontWeight:"normal"}}>{item.returnReason}</label>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="col-md-2">
                              <label>{utils.getLabelByID('Cargo_Type_')}</label>
                            </div>
                            <div className="col-md-2">
                              <label style={{ fontWeight:"normal"}}>  {item.cargoType}</label>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="col-md-2">
                              <label>{utils.getLabelByID('Package_Type_')}</label>
                            </div>  
                            <div className="col-md-2">
                              <label style={{ fontWeight:"normal"}}>  {item.packageType}</label>
                            </div>
                            <div className="col-md-2">
                              <label>{utils.getLabelByID('No_of_Packages_')}</label>
                            </div>
                            <div className="col-md-2">  
                              <label style={{ fontWeight:"normal"}}>{item.noOfPackages}</label>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="col-md-2">
                              <label>{utils.getLabelByID('Gross_Weight_')}</label>
                            </div>
                            <div className="col-md-2">
                              <label style={{ fontWeight:"normal"}}>  {item.grossWeight} {item.grossWeightUOM}</label>
                            </div>

                            <div className="col-md-2">
                              <label>{utils.getLabelByID('Net_Weight_')}</label>
                            </div>
                            <div className="col-md-2">   
                              <label style={{ fontWeight:"normal"}}>  {item.netWeight} {item.netWeightUOM}</label>
                            </div>

                            <div className="col-md-2">
                              <label>{utils.getLabelByID('Volumetric_Weight_')}</label>
                            </div>
                            <div className="col-md-2">  
                              <label style={{ fontWeight:"normal"}}>  {item.volumetricWeight} {item.volumetricUOM}</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12 text-center">
                            <div className="shadowBox recipt" style={{ margin:"5px 15px 5px 15px" }}>
                                <img src={baseUrl + item.transportImage} onError={this.addDefaultHAWBSrc} height="30%" />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-group">
                              <div className="col-md-12">
                                  <Lable text={utils.getLabelByID('Shipping_Airline_Agent')} columns="12" style={{marginBottom:"3px"}}></Lable>
                                  {/* <div className="col-md-2">
                                      <label>Code: </label>
                                  </div>    
                                  <div className="col-md-2">
                                    <label style={{ fontWeight:"normal"}}>  {item.shippingBCode}</span>
                                  </div> 
                                  <div className="col-md-2">
                                    <label>{utils.getLabelByID('Business_Code_')}</label>
                                  </div>
                                  <div className="col-md-2">
                                    <label style={{ fontWeight:"normal"}}>  {item.shippingBCode}</label>
                                  </div>
                                  <div className="col-md-2">
                                    <label>{utils.getLabelByID('Name_')}</label>
                                  </div>
                                  <div className="col-md-2">
                                    <label style={{ fontWeight:"normal"}}>  {item.shippingName}</label>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="form-group"></div>

                          <div className="form-group">
                              <div className="col-md-12">
                                  <Lable text={utils.getLabelByID('Cargo_Handler')} columns="12" style={{marginBottom:"3px"}}></Lable>
                                  {/* <div className="col-md-2">
                                      <label>Code: </label>
                                  </div>    
                                  <div className="col-md-2">
                                    <label style={{ fontWeight:"normal"}}>  {item.CargoCode}</span>
                                  </div> 
                                  <div className="col-md-2">
                                    <label>{utils.getLabelByID('Business_Code_')}</label>
                                  </div>
                                  <div className="col-md-2">
                                    <label style={{ fontWeight:"normal"}}>  {item.CargoBCode}</label>
                                  </div>
                                  <div className="col-md-2">
                                    <label>{utils.getLabelByID('Name_')}</label>
                                  </div>
                                  <div className="col-md-2">
                                    <label style={{ fontWeight:"normal"}}>  {item.CargoName}</label>
                                  </div>
                              </div>
                          </div>

                          <div className="form-group"></div>

                          {/* <div className="form-group">
                            <div className="col-md-12">
                                  <Lable text={utils.getLabelByID("Broker")} columns="12" style={{marginBottom:"3px"}}></Lable>
                                  <div className="col-md-2">
                                      <label>Code: </label>
                                  </div>    
                                  <div className="col-md-2">
                                    <label style={{ fontWeight:"normal"}}>  {item.brokerCode}</span>
                                  </div>
                                  <div className="col-md-2">
                                    <label>Business Code: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <label style={{ fontWeight:"normal"}}>  {item.brokerBCode}</span>
                                  </div>
                                  <div className="col-md-2">
                                    <label>Name: </label>
                                  </div>
                                  <div className="col-md-2">
                                    <label style={{ fontWeight:"normal"}}>  {item.brokerName}</span>
                                  </div>
                              </div>
                          </div>                           
                          <div className="form-group">
                            <div className="col-md-12">
                                <div className="col-md-2">
                                  <label>{utils.getLabelByID('Mode_Of_transport_')}</label>
                                </div>
                                <div className="col-md-6">
                                  <label style={{ fontWeight:"normal"}}>  {item.modeOfTransport} <i style={{fontSize: "20px", paddingLeft: "10px" }}className={ this.getTransportModeIcon(item.modeOfTransport)} aria-hidden="true"></i></label>
                                </div>
                            </div>
                          </div>
                          
                          <div className="form-group">
                              <div className="col-md-12">
                                <div className="col-md-2">
                                  <label>{utils.getLabelByID('Carrier_Number_')}</label>
                                </div>
                                <div className="col-md-2">
                                  <label style={{ fontWeight:"normal"}}>  {item.carrierNumber}</label>
                                </div>
                                <div className="col-md-2">
                                  <label>{utils.getLabelByID('Carrier_Registration_Number_')}</label>
                                </div>
                                <div className="col-md-2">
                                  <label style={{ fontWeight:"normal"}}>  {item.carrierRegistrationNumber}</label>
                                </div>
                              </div>
                          </div>
                          
                          <div className="form-group">
                              <div className="col-md-12">
                                  <div className="col-md-2">
                                    <label>{utils.getLabelByID('Date_of_Departure_')}</label>
                                  </div>
                                  <div className="col-md-2">
                                    <label style={{ fontWeight:"normal"}}>  {item.dateOfDeparture}</label>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="form-group">
                              <div className="col-md-12">
                                  <div className="col-md-2">
                                    <label>{utils.getLabelByID('Port_of_Load_')}</label>
                                  </div>
                                  <div className="col-md-2">
                                    <label style={{ fontWeight:"normal"}}>  {item.portLoad}</label>
                                  </div>
                                  <div className="col-md-2">
                                    <label>{utils.getLabelByID('Port_of_Discharge_')}</label>
                                  </div>
                                  <div className="col-md-2">
                                    <label style={{ fontWeight:"normal"}}>  {item.portOfDischarge}</label>
                                  </div>
                                  <div className="col-md-2">
                                    <label>{utils.getLabelByID('Original_Load_Port_')}</label>
                                  </div>
                                  <div className="col-md-2">
                                    <label style={{ fontWeight:"normal"}}>  {item.originalLoadPort}</label>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="form-group">
                              <div className="col-md-12">
                                  <div className="col-md-2">
                                    <label>{utils.getLabelByID('Destination_Country_')}</label>
                                  </div>
                                  <div className="col-md-10">
                                    <label style={{ fontWeight:"normal"}}> {item.destinationCountry} </label>
                                    <img style={{ width: "28px", marginLeft: "10px" }} src={item.destinationCountryFlagImage} />
                                  </div>
                              </div>
                          </div>
                          
                          <div className="form-group">
                              <div className="col-md-12">
                                  <div className="col-md-2">
                                    <label>{utils.getLabelByID('Submission_Channel_')}</label>
                                  </div>
                                  <div className="col-md-10">
                                    <label style={{ fontWeight:"normal"}}> {item.submissionChannel}</label>
                                  </div>
                              </div>
                          </div>
                        </div>