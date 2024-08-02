// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;  

contract Edubukesealer{

/////////////////// STRUCTURE /////////////////////////////////////////////////////////////////////

  struct Institute
  {
  string instituteName;
  string ackronym;
  uint256 witnessCount;
  address currentWitness;
  uint256 id;
  }


  struct Cert {
    Institute institute; 
    string studentname;
    string certHash;
    string certType;
    string certURI;
    uint256 timestamp;
    address witness;
    string issuerName;
  }

  struct bulkuploaddata {
    string studentname;
    string URI; 
    string hash; 
    string _type;
    address _witness;
  }

  
///////////// variables /////////////////////////////////////////////////////////////

  address private Contractowner;
  uint256 IssuerID = 1;
  uint256 InstituteID = 1;
  // uint256 private nextCertId = 1;

////////////////////// MAPPINGS ////////////////////////////////////////////////////////////////////

  mapping(bytes32 => Cert) private certificates;  

  mapping(uint256 => Institute) private institutes; //address to institute

  mapping(uint256 => address[]) private instituteWitnesses; 

  mapping(address => bool) private registeredInstitute;

  mapping(uint256 => mapping(address => bool) ) private institutewitnesschk;

  mapping(uint256 => mapping(address => bool)) private approvedInstitutes;

  mapping(address => uint256) private institute_ID;


 ///////////////////// EVENTS ////////////////////////////////////////////////////////////////////////

  event IssuerRegistered(uint256 id, string name);

  event InstituteRegistered(uint256 id, string name);

  event WitnessRegistered(uint256 issuerId, address witness);

  event OwnerRegistered(address owner);

  event CertificatePosted(string hash, uint256 issuerId, string studentname, string issuerName);

  event instituteWitnessUpdated(uint256 id, address witness);

  event InstituteRevoked(uint256 id, address instituteAddress); // added

  event BulkUploadFailed(string[] failedHashes, uint256 count); // added




///////////////// CONSTRUCTOR /////////////////////////////////////////////////////////////////////////

  
  constructor ()
  {
      Contractowner =  msg.sender;
  }


  //////////////// MODIFIERS ////////////////////////////////////////////////////////////////////////


  modifier OnlyContractOwner {
    require(msg.sender == Contractowner, "Access Not Allowed except the contract owner");
    _;
  }


  modifier onlyInstitute {
    require(registeredInstitute[msg.sender], "Not the verified institute");
    _;
  }

 
  modifier eitherInstituteOrOwner {
    require(registeredInstitute[msg.sender] || msg.sender == Contractowner, "Permission denied" );
    _;
  }



//////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////


// This function is used to Approve Institutes

  function approveInstitutes(address regulator) external {          
    uint256 id = institute_ID[msg.sender];
    require(institutewitnesschk[id][msg.sender] || msg.sender == Contractowner , "Not the correct institute");
    approvedInstitutes[id][regulator] = true;
  }

  
  // This function is used to register Institute

  function registerInstitute( string memory _institueName,string  memory _ackronynm, address _witness) OnlyContractOwner external { 
    require(institutes[InstituteID].id == 0, "Issuer already registered");
    institutes[InstituteID].instituteName = _institueName;
    institutes[InstituteID].ackronym = _ackronynm;
    instituteWitnesses[InstituteID].push(_witness);
    institutes[InstituteID].currentWitness = _witness;
    institutes[InstituteID].id = InstituteID;
    registeredInstitute[_witness] = true;
    institutewitnesschk[InstituteID][_witness] = true;
    institute_ID[_witness] = InstituteID;
    institutes[InstituteID].witnessCount++;
    emit InstituteRegistered(InstituteID, _institueName);
    InstituteID++;
  }
   

  // This function is used to get Institute ID

  function viewInstituteID() external view returns(uint256) {
     return InstituteID - 1 ;
  }


  // This Function is used to Update the Witness

  function UpdateWitness(address _newwitness) external  {
    uint256 id = institute_ID[msg.sender];
    require(institutewitnesschk[id][msg.sender] || msg.sender == Contractowner , "Not the correct institute");
    institutes[id].currentWitness = _newwitness;
    institutes[id].witnessCount++;
    registeredInstitute[_newwitness] = true;
    instituteWitnesses[id].push(_newwitness);
    institutewitnesschk[id][_newwitness] = true;
    institute_ID[_newwitness] = id;
    emit instituteWitnessUpdated(id, _newwitness);
  }


  // this function is used to revoke Witness

  function revokeWitness(address _witness) external  {
    uint256 id = institute_ID[msg.sender];
    require(institutewitnesschk[id][msg.sender] || msg.sender == Contractowner , "Not the correct institute");
    require(institutes[id].witnessCount-1 > 0, "There cannot be zero witnesses");
    institutes[id].witnessCount--;
    registeredInstitute[_witness] = false;
    institutewitnesschk[id][_witness] = false;
  }


  // This function is used to revoke institute

  function revokeInstitute(address _institute) external OnlyContractOwner {
    require(registeredInstitute[_institute], "Institute not registered");
    
    // Remove the institute from the mappings
    uint256 id = institute_ID[_institute];
    delete institutes[id];
    // delete instituteWitnesses[id];
    // delete institute_ID[_institute]; 
    
    // Remove institute from registeredInstitute mapping
    registeredInstitute[_institute] = false;
    
    // Emit event
    emit InstituteRevoked(id, _institute);
}

  // string to bytes32 conversion

  function stringToBytes32(string memory source) private pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(source);
    if (tempEmptyStringTest.length == 0) 
     {
      return 0x0;
     }
    assembly
     {
    result := mload(add(source, 32))
     }
    }


  // This function is used to post certificate

  function postCertificate(string memory _studentname, string memory _uri, string memory _hash, string memory _type, string memory _issuerName) onlyInstitute external {
    bytes32 byte_hash = stringToBytes32(_hash);
    require(certificates[byte_hash].timestamp == 0, "Certificate with this hash already exists");
    
    uint256 id = institute_ID[msg.sender];
    certificates[byte_hash] = Cert(institutes[id], _studentname, _hash, _type, _uri, block.timestamp, msg.sender, _issuerName);
    emit CertificatePosted(_hash, id, _studentname, _issuerName);

  }



  // This function is used for bulk upload

  function bulkUpload(bulkuploaddata[] memory data, string memory _issuerName) onlyInstitute external {
    require(data.length <= 50, "Tuple size exceeded");

    string[] memory failedUploads = new string[](data.length);
    uint256 failedCount = 0;

    for (uint256 i = 0; i < data.length; i++)
    {
    bytes32 byte_hash = stringToBytes32(data[i].hash);
    if (certificates[byte_hash].timestamp != 0) {
            // Record the hash of the failed certificate upload
            failedUploads[failedCount] = data[i].studentname;
            failedCount++;
            continue; // Skip this iteration and continue with the next one
        }

    uint256 id = institute_ID[data[i]._witness];
    require(certificates[byte_hash].timestamp == 0, "Certificate with this hash already exists");
    
    certificates[byte_hash] = Cert(institutes[id], data[i].studentname, data[i].hash, data[i]._type, data[i].URI, block.timestamp, data[i]._witness, _issuerName);
    emit CertificatePosted(data[i].hash, id, data[i].studentname, _issuerName);
    }

     //Emit an event for failed uploads if there are any
    if (failedCount > 0) {
        emit BulkUploadFailed(failedUploads, failedCount);
    }
  }


  // This function is used to updateCertificateURI

  function updateCertificateURI(string memory _hash , string memory _uri) eitherInstituteOrOwner external {
    bytes32 byte_hash = stringToBytes32(_hash);
    require(certificates[byte_hash].timestamp != 0, "Certificate does not exists");
    certificates[byte_hash].certURI = _uri;
  }

   function updateBulkCertificateURI(bulkuploaddata[] memory data) eitherInstituteOrOwner external {
    for (uint256 i = 0; i < data.length; i++)
    {
    bytes32 byte_hash = stringToBytes32(data[i].hash);
    require(certificates[byte_hash].timestamp != 0, "Certificate does not exists");
    certificates[byte_hash].certURI = data[i].URI;
    }
  }


  // This function is used to verify certificate with data

  function Viewcertificatedata(string memory _hash) external view returns(string memory, string memory, string memory, string memory, string memory, address, uint256){
     bytes32 byte_hash = stringToBytes32(_hash);
     require(certificates[byte_hash].timestamp != 0, "Certificate does not exists");
     Cert memory temp = certificates[byte_hash];
    //  require(approvedInstitutes[temp.institute.id][msg.sender] || institutewitnesschk[temp.institute.id][msg.sender],"not the institute approved regulator");
     return(temp.studentname, temp.issuerName, temp.certType, temp.certHash, temp.certURI, temp.witness, temp.timestamp);
  }


  // This function is used to verify certificate without data

  function Verifycertificate(string memory _hash) external view returns(bool) {
     bytes32 byte_hash = stringToBytes32(_hash);
     if(certificates[byte_hash].timestamp != 0)
     {
      return true;
     }
     else {
      return false;
     }
  }
  
  
  // This function is used to verify Institute

  function  verifyInstitute() external view returns(string memory, string memory, address, uint256 ) {
    require(registeredInstitute[msg.sender], "Not the registered institute");
    uint256 id = institute_ID[msg.sender];
    return(institutes[id].instituteName, institutes[id].ackronym, institutes[id].currentWitness, institutes[id].id);
  }


  // This function is used to verify contract owner

  function verifyContractOwner() external view  returns(bool) {
    if( msg.sender == Contractowner)
    {
      return true;
    }
    else
    {
      return false;
    }
  }


  // this function is used to get the institute witness

  function getInstituteWitnesses(address _witness) external view eitherInstituteOrOwner returns(address[] memory) {
    uint256 id = institute_ID[_witness];
    return instituteWitnesses[id];
  }


  // This function is used to get institute ID

  function getinstituteID(address _witness) external view returns(uint256) {
      return(institute_ID[_witness]);
  }

   // this function to view a certificate URI by providing its hash // 14 may added
    function viewCertificateURI(string memory _hash) external view returns(string memory) {
        return certificates[stringToBytes32(_hash)].certURI;
    }
    
    //14 may added
    function chkApprovedInstitute(string memory _hash) external view returns(bool) {
    bytes32 byte_hash = stringToBytes32(_hash);
    require(certificates[byte_hash].timestamp != 0, "Certificate does not exists");
    Cert memory temp = certificates[byte_hash];
    if(approvedInstitutes[temp.institute.id][msg.sender] || institutewitnesschk[temp.institute.id][msg.sender]){
    return true;
    }
    else {
    return false;
    }


  }
   
    
}

  


