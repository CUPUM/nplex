import type { UserCredentials } from '@supabase/supabase-js';

interface ProviderDetail {
	title: string;
	logoFilepath: string;
	svg: string;
}

export const providers: Partial<Record<UserCredentials['provider'], ProviderDetail>> = {
	linkedin: {
		title: 'LinkedIn',
		logoFilepath: '/media/socials/linkedin.svg',
		svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M44.4567 0H3.54333C2.60358 0 1.70232 0.373315 1.03782 1.03782C0.373315 1.70232 0 2.60358 0 3.54333V44.4567C0 45.3964 0.373315 46.2977 1.03782 46.9622C1.70232 47.6267 2.60358 48 3.54333 48H44.4567C45.3964 48 46.2977 47.6267 46.9622 46.9622C47.6267 46.2977 48 45.3964 48 44.4567V3.54333C48 2.60358 47.6267 1.70232 46.9622 1.03782C46.2977 0.373315 45.3964 0 44.4567 0ZM14.3067 40.89H7.09V17.9667H14.3067V40.89ZM10.6933 14.79C9.87473 14.7854 9.07583 14.5384 8.39747 14.0802C7.71911 13.622 7.19168 12.9731 6.88175 12.2154C6.57183 11.4577 6.4933 10.6252 6.65606 9.82291C6.81883 9.02063 7.2156 8.28455 7.79631 7.70756C8.37702 7.13057 9.11563 6.73853 9.91893 6.58092C10.7222 6.42331 11.5542 6.50719 12.3099 6.82197C13.0656 7.13675 13.7111 7.66833 14.1649 8.34962C14.6188 9.03092 14.8606 9.83138 14.86 10.65C14.8677 11.1981 14.765 11.7421 14.558 12.2496C14.351 12.7571 14.044 13.2178 13.6551 13.6041C13.2663 13.9905 12.8037 14.2946 12.2948 14.4983C11.786 14.702 11.2413 14.8012 10.6933 14.79ZM40.9067 40.91H33.6933V28.3867C33.6933 24.6933 32.1233 23.5533 30.0967 23.5533C27.9567 23.5533 25.8567 25.1667 25.8567 28.48V40.91H18.64V17.9833H25.58V21.16H25.6733C26.37 19.75 28.81 17.34 32.5333 17.34C36.56 17.34 40.91 19.73 40.91 26.73L40.9067 40.91Z" fill="#0A66C2"/>
		</svg>
		`,
	},
	facebook: {
		title: 'Facebook',
		logoFilepath: '/media/socials/facebook.svg',
		svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z" fill="#1877F2"/>
		<path d="M33.3422 30.9375L34.4062 24H27.75V19.5C27.75 17.602 28.68 15.75 31.6613 15.75H34.6875V9.84375C34.6875 9.84375 31.9411 9.375 29.3152 9.375C23.8331 9.375 20.25 12.6975 20.25 18.7125V24H14.1562V30.9375H20.25V47.7084C22.7349 48.0972 25.2651 48.0972 27.75 47.7084V30.9375H33.3422Z" fill="white"/>
		</svg>
		`,
	},
	google: {
		title: 'Google',
		logoFilepath: '/media/socials/google.svg',
		svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M47.5321 24.5528C47.5321 22.9214 47.3998 21.2811 47.1176 19.6761H24.48V28.9181H37.4435C36.9055 31.8988 35.1771 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.5321 31.8547 47.5321 24.5528Z" fill="#4285F4"/>
		<path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3889 42.2078L32.6549 36.2111C30.5031 37.675 27.7253 38.5039 24.4888 38.5039C18.2276 38.5039 12.9187 34.2798 11.0139 28.6006H3.03299V34.7825C7.10721 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853"/>
		<path d="M11.0051 28.6006C9.99976 25.6199 9.99976 22.3922 11.0051 19.4115V13.2296H3.03301C-0.37099 20.0112 -0.37099 28.0009 3.03301 34.7825L11.0051 28.6006Z" fill="#FBBC04"/>
		<path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6867 13.0973L40.5388 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4056 0.00161733 7.10721 5.11644 3.03299 13.2296L11.0051 19.4115C12.9011 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335"/>
		</svg>
		`,
	},
	twitter: {
		title: 'Twitter',
		logoFilepath: '/media/socials/twitter.svg',
		svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M42 48H6C2.688 48 0 45.312 0 42V6C0 2.688 2.688 0 6 0H42C45.312 0 48 2.688 48 6V42C48 45.312 45.312 48 42 48Z" fill="#1D9BF0"/>
		<path d="M18.432 36.192C29.748 36.192 35.94 26.808 35.94 18.684C35.94 18.42 35.94 18.156 35.928 17.892C37.128 17.028 38.172 15.936 39 14.7C37.896 15.192 36.708 15.516 35.46 15.672C36.732 14.916 37.704 13.704 38.172 12.264C36.984 12.972 35.664 13.476 34.26 13.752C33.132 12.552 31.536 11.808 29.772 11.808C26.376 11.808 23.616 14.568 23.616 17.964C23.616 18.444 23.676 18.912 23.772 19.368C18.66 19.116 14.124 16.656 11.088 12.936C10.56 13.848 10.26 14.904 10.26 16.032C10.26 18.168 11.352 20.052 12.996 21.156C11.988 21.12 11.04 20.844 10.212 20.388C10.212 20.412 10.212 20.436 10.212 20.472C10.212 23.448 12.336 25.944 15.144 26.508C14.628 26.652 14.088 26.724 13.524 26.724C13.128 26.724 12.744 26.688 12.372 26.616C13.152 29.064 15.432 30.84 18.12 30.888C16.008 32.544 13.356 33.528 10.476 33.528C9.98402 33.528 9.49202 33.504 9.01202 33.444C11.724 35.172 14.964 36.192 18.432 36.192Z" fill="white"/>
		</svg>
		`,
	},
	// office: {
	// 	title: 'Office 365',
	// 	logoFilepath: '/media/socials/office.svg',
	// 	svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
	// 	<path fill-rule="evenodd" clip-rule="evenodd" d="M6.43283 38.7097V9.80645L28.9548 0L41.5671 4.12903V44.3871L28.9548 48L6.43283 38.7097ZM6.43283 38.7097L14.0903 35.0968V11.871L28.9548 7.74195V42.3226L6.43283 38.7097Z" fill="#EB3D01"/>
	// 	</svg>
	// 	`
	// }
} as const;
