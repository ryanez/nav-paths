export const Home = '/';
export const AboutUs = '/about-us';
export const SignIn = '/sign-in';
export const Profiles = '/profiles';
export const ProfileNew = `${Profiles}/new`;
export const ProfileDetails = `${Profiles}/:profileId`;
export const ProfileEdit = `${ProfileDetails}/edit`;

export const HomeWithLanguage = `/:lang`;
export const Customer = `${HomeWithLanguage}/customer/:customerId`;
export const CustomerAddresses = `${Customer}/addresses`
export const Invoices = `${Customer}/invoices`;
export const Invoice = `${Invoices}/:invoiceId`;
export const InvoicePayments = `${Invoice}/payments`;