export interface UserDataEntry{
    Email: string;
    Password: string;
} 

interface UserData{
    id:   string;   
	name:  string;
	email: string;
	rol:   string; 
}

export interface UserDataResponse{
    token:   string;     
	type:     string;     
	expireIn: Date;    
	user:     UserData; 
}