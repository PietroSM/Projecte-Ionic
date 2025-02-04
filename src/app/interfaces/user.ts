export interface User {
    id?: number;
    name: string;
    email: string;
    password?: string;
    avatar: string;
    lat: number;
    lng: number;
    me?: boolean;
}

export interface UserLogin {
    email: string;
    password: string;
    lat?: number;
    lng?: number;
}

export interface UserProfileEdit {
    name: string;
    email: string;
}

export interface UserPhotoEdit {
    avatar: string;
}

export interface UserPasswordEdit {
    password: string;
}

export interface UserGoogleLogin {
    token: string;
    lat?: number;
    lng?: number;
}


export interface GoogleUser {
    imageUrl: string | null;
    email: string | null;
    name: string | null;
  }


export interface UserFacebookLogin {
    token: string;
    lat?: number;
    lng?: number;
}