
export class Credentials {
  username!: string;
  password!: string;
}

export class User {
  id!: number;
  fullName!: string;
  username!: string;
  password!: string;
  email!: string;
  birthDate!: Date;
  userRole!: string;
  status!: boolean;
}

export class Student extends User{
  academicNumber!: number;
  careerId!: number;
  isSanctioned!: boolean;
}

export class Career {
  id!: number;
  name!: string;
}

export class Parameter {
  id!: number;
  parameterName!: string;
  parameterValue!: string;
}
