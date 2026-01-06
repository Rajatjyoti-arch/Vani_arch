import React from "https://esm.sh/react@18.3.1"
import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0"
import { Resend } from "https://esm.sh/resend@4.0.0"
import { renderAsync, Html, Head, Preview, Body, Container, Heading, Text } from "https://esm.sh/@react-email/components@0.0.22"

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string

// OTP Email Template
const OTPEmail = ({ token, email }: { token: string; email: string }) => {
  return React.createElement(Html, null,
    React.createElement(Head, null),
    React.createElement(Preview, null, `Your VANI verification code: ${token}`),
    React.createElement(Body, { style: { backgroundColor: '#f6f9fc', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" } },
      React.createElement(Container, { style: { backgroundColor: '#ffffff', margin: '40px auto', padding: '40px', borderRadius: '8px', maxWidth: '480px' } },
        React.createElement(Heading, { style: { color: '#1a1a1a', fontSize: '24px', fontWeight: 'bold', margin: '0 0 24px', textAlign: 'center' } }, 'VANI Student Portal'),
        React.createElement(Text, { style: { color: '#333', fontSize: '16px', lineHeight: '24px', margin: '16px 0' } }, 
          `Hello! Use the verification code below to sign in to your account (${email}):`
        ),
        React.createElement('code', { 
          style: { 
            display: 'block', 
            padding: '20px', 
            width: '100%', 
            backgroundColor: '#1a1a1a', 
            borderRadius: '8px', 
            color: '#ffffff', 
            fontSize: '32px', 
            fontWeight: 'bold', 
            letterSpacing: '8px', 
            textAlign: 'center', 
            margin: '24px 0' 
          } 
        }, token),
        React.createElement(Text, { style: { color: '#666', fontSize: '16px', lineHeight: '24px', marginTop: '24px' } }, 
          "This code expires in 10 minutes. If you didn't request this code, you can safely ignore this email."
        ),
        React.createElement(Text, { style: { color: '#898989', fontSize: '12px', textAlign: 'center', marginTop: '32px' } }, 
          'VANI - Anonymous Grievance Redressal System'
        )
      )
    )
  )
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('not allowed', { status: 400 })
  }

  const payload = await req.text()
  const headers = Object.fromEntries(req.headers)
  const wh = new Webhook(hookSecret)
  
  try {
    const {
      user,
      email_data: { token },
    } = wh.verify(payload, headers) as {
      user: {
        email: string
      }
      email_data: {
        token: string
        token_hash: string
        redirect_to: string
        email_action_type: string
        site_url: string
      }
    }

    const html = await renderAsync(React.createElement(OTPEmail, { token, email: user.email }))

    const { error } = await resend.emails.send({
      from: 'VANI <onboarding@resend.dev>',
      to: [user.email],
      subject: `Your VANI verification code: ${token}`,
      html,
    })
    
    if (error) {
      console.error('Resend error:', error)
      throw error
    }
    
    console.log('OTP email sent successfully to:', user.email)
  } catch (error: any) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({
        error: {
          http_code: error.code || 500,
          message: error.message,
        },
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
