package main

import (
	"fmt"
	"encoding/json"
	"github.com/hyperledger/fabric/core/chaincode/lib/cid"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
	"time"
)

//-----------------------defining Structs----------------//
type SimpleChaincode struct {
}

type customerData struct {
	CustomerID               string                    `json:"CustomerID"`
	DateOfBirth              string                    `json:"DateOfBirth"`
	Type                     string                    `json:"Type"`
	MobileNumber             string                    `json:"MobileNumber"`
	AuthSignatory            string                  `json:"AuthSignatory"`
	Expiry                   string                    `json:"Expiry"`
	TLExpiry                 string                    `json:"TLExpiry"`
	Inception                string                    `json:"Inception"`
	Email                    string                    `json:"Email"`
	TradeLicence             string                    `json:"TradeLicence"`
	DocumentName             string                    `json:"DocumentName"`
	DocumentKey              string                    `json:"DocumentKey"`
	SharingInformation       []sharingInformation      `json:"SharingInformation"`
	SelfRegisteredAttributes []selfRegisteredAttribute `json:"SelfRegisteredAttributes"`
	SelfRegisteredGroups     []selfRegisteredGroup     `json:"SelfRegisteredGroups"`
}

type selfRegisteredGroup struct {
	AttributeGroupID string                  `json:"AttributeGroupID"`
	Attributes       selfRegisteredAttribute `json:"Attributes"`
	Documents        []string                `json:"Documents"`
}
type selfRegisteredAttribute struct {
	AttributeID      string   `json:"AttributeID"`
	AttributeGroupID string   `json:"AttributeGroupID"`
	AttributeType    string   `json:"ProfileName"`
	Documents        []string `json:"Documents"`
}

type sharingInformation struct {
	EntityName  string `json:"EntityName"`
	EntityCode  string `json:"EntityCode"`
	ProfileName string `json:"ProfileName"`
}

type ekycProfile struct {
	ProfileName              string                    `json:"ProfileName"`
	Customer                 customerData              `json:"Customer"`
	SelfRegisteredAttributes []selfRegisteredAttribute `json:"SelfRegisteredAttributes"`
	Status                   string                    `json:"Status"`
	InitiatingOrg            string                    `json:"InitiatingOrg"`
	OrginizationMSP          string                    `json:"InitiatingMSP"`
	DocumentName             string                    `json:"DocumentName"`
	DocumentKey              string                    `json:"DocumentKey"`
	CreatedOn                int  					   `json:"CreatedOn"`
	UpdatedOn                int  					   `json:"UpdatedOn"`
}

type ekycProfileForm struct {
	SectionName string                    `json:"SectionName"`
	SelfRegisteredGroup string                    `json:"SelfRegisteredGroup"`
	SelfRegisteredAttribute string                    `json:"SelfRegisteredAttribute"`
	SelfRegisteredSurvey string                    `json:"SelfRegisteredSurvey"`
}

type ekycProfileFormSections struct {
	SectionName string                    `json:"SectionName"`
	SelfRegisteredGroup string                    `json:"SelfRegisteredGroup"`
	SelfRegisteredAttribute string                    `json:"SelfRegisteredAttribute"`
	SelfRegisteredSurvey string                    `json:"SelfRegisteredSurvey"`
}



//--------------------END staus defination--------------//
//--------------------END defining Structs--------------//

func main() {
	err := shim.Start(new(SimpleChaincode))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}

var myLogger = shim.NewLogger("Development eKYC")

func (t *SimpleChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	return shim.Success(nil)
}

func (t *SimpleChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {

	//getting MSP

	function, args := stub.GetFunctionAndParameters()
	fmt.Println("Invoke is running " + function)

	switch functionName := function; functionName {
	case "UpdateBalance":
		return t.updateBalance(stub, args)

	default:
		fmt.Println("Invoke did not find func: " + function) //error
		return shim.Error("Received unknown function invocation")

	}

}

func (t *SimpleChaincode) createKycRequest(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	certOrgType, err := cid.GetMSPID(stub)
	if err != nil {
		return shim.Error("invalid Enrolment mspid Type invalid!!! " + err.Error())
	}
	fmt.Printf("Insert: %v", args)
	_DocumentName := "CustomerProfile"
	CreationDateTemp := int(time.Now().Unix())
	_key := fmt.Sprint( args[4], "Request", CreationDateTemp)	
	customer := &customerData{
	CustomerID: args[1],
	DateOfBirth : args[2],
	Type :  args[3],
	MobileNumber:  args[4],
	AuthSignatory: args[5],
	Expiry:args[6],
	TLExpiry:args[7],
	Inception:args[8],
	Email : args[9],
	TradeLicence:args[10],
	}
	profile := &ekycProfile{
		ProfileName: args[11],
		Customer: *customer,
		Status: args[12],
		InitiatingOrg: args[13],
		OrginizationMSP:  certOrgType,
		CreatedOn:CreationDateTemp,
		DocumentName: _DocumentName,
		DocumentKey:_key,
	}

	profileJSONasBytes, err4 := json.Marshal(profile)
	if err4 != nil {
		return shim.Error("Failed to Marshal state:" + err4.Error())
	}
	err4 = insertData(stub,"benefitCollection", "",profileJSONasBytes)
	if err4 != nil {
		return shim.Error("Failed to Put State:" + err4.Error())
	}	
	return shim.Success(nil)
}

func (t *SimpleChaincode) updateKycRequest(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	fmt.Printf("Insert: %v", args)
	_DocumentName := "Accounts"
	err4 = insertData("benefitCollection", '',accountJSONasBytes)
	if err4 != nil {
		return shim.Error("Failed to Put State:" + err4.Error())
	}	
	return shim.Success(nil)
}

func (t *SimpleChaincode) shareKycData(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	certOrgType, err := cid.GetMSPID(stub)
	if err != nil {
		return shim.Error("invalid Enrolment mspid Type invalid!!! " + err.Error())
	}
	fmt.Printf("Insert: %v", args)
	_DocumentName := "CustomerProfile"
	CreationDateTemp := int(time.Now().Unix())
	_key := fmt.Sprint( args[4],  args[11], CreationDateTemp)	
	trnxAsBytes, err2 := stub.GetState(_Name)
	if err2 != nil {
		fmt.Println("Failed to get state.")
		return shim.Error("Failed to Get State:" + err2.Error())
	}
	if trnxAsBytes != nil {
		fmt.Println("This data already exists in state.")

		var _account account

		err3 := json.Unmarshal(trnxAsBytes, &_account)
		if err3 != nil {
			fmt.Println("Failed to UnMarshal state.")
			return shim.Error("Failed to UnMarshal state:" + err3.Error())
		}
		_Amount += _account.Value
	}
	profile := &ekycProfile{
		ProfileName: args[11],
		Customer: *customer,
		Status: args[12],
		InitiatingOrg: args[13],
		OrginizationMSP:  certOrgType,
		CreatedOn:CreationDateTemp,
		DocumentName: _DocumentName,
		DocumentKey:_key,
	}

	profileJSONasBytes, err4 := json.Marshal(profile)
	if err4 != nil {
		return shim.Error("Failed to Marshal state:" + err4.Error())
	}
	err4 = insertData(stub,"benefitCollection", "",profileJSONasBytes)
	if err4 != nil {
		return shim.Error("Failed to Put State:" + err4.Error())
	}	
	return shim.Success(nil);
}

func insertData(stub shim.ChaincodeStubInterface, collection string, key string, data []byte) error {
	err := stub.PutPrivateData(collection, key, data)
	if err != nil {
		return err
	}

	err = stub.SetEvent("chainCodeEvent"+collection, []byte(data))
	if err != nil {
		return err
	}

	return nil
}
