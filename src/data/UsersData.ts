export interface User {
id: number;
name: string;
email: string;
role: string;
company: string;
}


export const users: User[] = [
{ id: 1, name: 'Ali Rezaei', email: 'ali@example.com', role: 'Admin', company: 'ParsCo' },
{ id: 2, name: 'Sara Ahmadi', email: 'sara@example.com', role: 'User', company: 'TechCorp' },
{ id: 3, name: 'Reza Karimi', email: 'reza@example.com', role: 'Manager', company: 'ParsCo' },
{ id: 4, name: 'Neda Mohammadi', email: 'neda@example.com', role: 'User', company: 'TechCorp' },
{ id: 5, name: 'Mina Hosseini', email: 'mina@example.com', role: 'Admin', company: 'SoftTech' },
{ id: 6, name: 'Kaveh Azizi', email: 'kaveh@example.com', role: 'User', company: 'SoftTech' },
{ id: 7, name: 'Leila Shiri', email: 'leila@example.com', role: 'Manager', company: 'ParsCo' },
{ id: 8, name: 'Omid Rahimi', email: 'omid@example.com', role: 'User', company: 'TechCorp' },
{ id: 9, name: 'Samira Jafari', email: 'samira@example.com', role: 'Admin', company: 'SoftTech' },
{ id: 10, name: 'Navid Parsa', email: 'navid@example.com', role: 'User', company: 'ParsCo' },
{ id: 11, name: 'Tara Mohseni', email: 'tara@example.com', role: 'User', company: 'TechCorp' },
{ id: 12, name: 'Aria Karbasi', email: 'aria@example.com', role: 'Manager', company: 'SoftTech' },
{ id: 13, name: 'Sina Ahmadi', email: 'sina@example.com', role: 'User', company: 'ParsCo' },
{ id: 14, name: 'Maryam Nouri', email: 'maryam@example.com', role: 'Admin', company: 'TechCorp' },
{ id: 15, name: 'Reza Ghorbani', email: 'reza.gh@example.com', role: 'User', company: 'SoftTech' },
];