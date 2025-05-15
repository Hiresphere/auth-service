export async function sendOtpEmail(email: string, name: string, otp: string) {
    console.log(
        `📧 [Mock Email] To: ${email} | Hi ${name}, your OTP is: ${otp}`,
    );
    // Later: integrate Resend, SendGrid, etc.
}
