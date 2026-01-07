export const TRANSACTIONAL_TEMPLATE_HTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
  <title></title>
  
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
    
    * {
      font-family: Arial, sans-serif;
    }

    

    @media only screen and (max-width: 600px) {
      .senlo-full-width {
        width: 100% !important;
      }
      .senlo-stack {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        direction: ltr !important;
      }
    }
  </style>
  
</head>
<body style="margin:0;padding:0;word-spacing:normal;background-color:#f9fafb;">
  <div role="article" aria-roledescription="email" lang="en" style="-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#f9fafb;">
    
    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f9fafb;">
      <tr>
        <td align="center">
          <table class="senlo-full-width" width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px; margin: 0 auto; max-width: 100%;">
            <tr>
              <td align="left" style="font-size: 0;">
                
    <!--[if mso]>
    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="background-color: #ffffff; padding: 0px 16px 0px 16px; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px">
    <![endif]-->
    <div style="background-color: #ffffff; padding: 0px 16px 0px 16px; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; font-size: 0; text-align: center;">
      <!--[if mso]>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
      <![endif]-->
      
    <!--[if mso]>
    <td  valign="top" style="width: 100%;">
    <![endif]-->
    <div class="senlo-stack" style="display: inline-block; width: 100%; max-width: 100%; vertical-align: top; font-size: 16px;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="left">
            <p style="margin: 0; text-align: left; color: inherit; font-size: 16px; line-height: 1.5; font-weight: normal; text-transform: none; letter-spacing: normal; padding: 10px 0px 10px 0px">Hello {{contact.first_name}} {{contact.last_name}},</p>
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso]>
    </td>
    <![endif]-->
  
      <!--[if mso]>
        </tr>
      </table>
      <![endif]-->
    </div>
    <!--[if mso]>
        </td>
      </tr>
    </table>
    <![endif]-->
  
    <!--[if mso]>
    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="background-color: #ffffff; padding: 12px 16px 0px 16px; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px">
    <![endif]-->
    <div style="background-color: #ffffff; padding: 12px 16px 0px 16px; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; font-size: 0; text-align: center;">
      <!--[if mso]>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
      <![endif]-->
      
    <!--[if mso]>
    <td  valign="top" style="width: 100%;">
    <![endif]-->
    <div class="senlo-stack" style="display: inline-block; width: 100%; max-width: 100%; vertical-align: top; font-size: 16px;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="left">
            <p style="margin: 0; text-align: left; color: inherit; font-size: 16px; line-height: 1.5; font-weight: normal; text-transform: none; letter-spacing: normal; padding: 10px 0px 10px 0px">You are receiving this email because the system identified your account {{contact.email}} as part of the project "{{project.name}}" and the campaign "{{campaign.name}}".</p><p style="margin: 0; text-align: left; color: inherit; font-size: 16px; line-height: 1.5; font-weight: normal; text-transform: none; letter-spacing: normal; padding: 10px 0px 10px 0px">This template was generated by an API trigger and may include additional variables provided in real time, for example:</p>
    <div style="margin: 0; text-align: left; color: inherit; font-size: 16px; line-height: 1.5; font-weight: normal">
      <ul style="margin: 0; padding-left: 24px; list-style-type: disc;">
        <li style="margin-bottom: 4px;">Reference ID: {{reference_id}}</li><li style="margin-bottom: 4px;">Status: {{status}}</li><li style="margin-bottom: 4px;">Custom note: {{custom_note}}</li>
      </ul>
    </div>
  <p style="margin: 0; text-align: left; color: inherit; font-size: 16px; line-height: 1.5; font-weight: normal; text-transform: none; letter-spacing: normal; padding: 10px 0px 10px 0px">Any data sent through the API can be safely inserted into the message to make it personal and context-aware for {{contact.first_name}}.</p><p style="margin: 0; text-align: left; color: inherit; font-size: 16px; line-height: 1.5; font-weight: normal; text-transform: none; letter-spacing: normal; padding: 10px 0px 10px 0px">Thank you for staying with "{{campaign.name}}". The project "{{project.name}}" will continue to send relevant information to {{contact.email}} whenever new events occur.</p>
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso]>
    </td>
    <![endif]-->
  
      <!--[if mso]>
        </tr>
      </table>
      <![endif]-->
    </div>
    <!--[if mso]>
        </td>
      </tr>
    </table>
    <![endif]-->
  
    <!--[if mso]>
    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="background-color: #ffffff; padding: 12px 16px 0px 16px; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px">
    <![endif]-->
    <div style="background-color: #ffffff; padding: 12px 16px 0px 16px; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; font-size: 0; text-align: center;">
      <!--[if mso]>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
      <![endif]-->
      
    <!--[if mso]>
    <td  valign="top" style="width: 100%;">
    <![endif]-->
    <div class="senlo-stack" style="display: inline-block; width: 100%; max-width: 100%; vertical-align: top; font-size: 16px;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="left">
            <p style="margin: 0; text-align: left; color: inherit; font-size: 16px; line-height: 1.5; font-weight: normal; text-transform: none; letter-spacing: normal; padding: 10px 0px 10px 0px">Best regards, <br/>
<strong>Igor</strong><br/>
{{project.name}}<br/>
{{campaign.name}}<br/>
Email: {{contact.email}}</p>
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso]>
    </td>
    <![endif]-->
  
      <!--[if mso]>
        </tr>
      </table>
      <![endif]-->
    </div>
    <!--[if mso]>
        </td>
      </tr>
    </table>
    <![endif]-->
  
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  
  </div>
</body>
</html>`;

export const TRANSACTIONAL_TEMPLATE_DESIGN_JSON = {
  rows: [
    {
      id: "iT3dtGP9ftuiLhL6e3Veb",
      type: "row",
      columns: [
        {
          id: "qS9KgB3Q2qyq2r6zwcw9C",
          width: 100,
          blocks: [
            {
              id: "vUCrQATv2l9vMALuNB_xz",
              data: {
                href: "",
                text: "Hello {{contact.first_name}} {{contact.last_name}},",
                align: "left",
                padding: {
                  top: 10,
                  left: 0,
                  right: 0,
                  bottom: 10,
                },
              },
              type: "paragraph",
            },
          ],
        },
      ],
      settings: {
        align: "center",
        padding: {
          top: 0,
          left: 16,
          right: 16,
          bottom: 0,
        },
        fullWidth: false,
        backgroundColor: "#ffffff",
      },
    },
    {
      id: "bd5PF6auuXL1rYxJGkIgx",
      type: "row",
      columns: [
        {
          id: "HMwJpK_QbCSWAFbcj_dyr",
          width: 100,
          blocks: [
            {
              id: "wV7s4m-8aAnX4XwSZWmU0",
              data: {
                href: "",
                text: 'You are receiving this email because the system identified your account {{contact.email}} as part of the project "{{project.name}}" and the campaign "{{campaign.name}}".',
                align: "left",
                padding: {
                  top: 10,
                  left: 0,
                  right: 0,
                  bottom: 10,
                },
              },
              type: "paragraph",
            },
            {
              id: "lldu6Q2BxL1DqF9P6WUrX",
              data: {
                href: "",
                text: "This template was generated by an API trigger and may include additional variables provided in real time, for example:",
                align: "left",
                padding: {
                  top: 10,
                  left: 0,
                  right: 0,
                  bottom: 10,
                },
              },
              type: "paragraph",
            },
            {
              id: "kAUMSZSccMB-wkKfshk8M",
              data: {
                align: "left",
                items: [
                  "Reference ID: {{reference_id}}",
                  "Status: {{status}}",
                  "Custom note: {{custom_note}}",
                ],
                padding: {
                  top: 10,
                  left: 24,
                  right: 0,
                  bottom: 10,
                },
                fontSize: 16,
                listType: "unordered",
                fontWeight: "normal",
                lineHeight: 1.5,
              },
              type: "list",
            },
            {
              id: "SVnxaELR5K7qkLg0LfRzU",
              data: {
                href: "",
                text: "Any data sent through the API can be safely inserted into the message to make it personal and context-aware for {{contact.first_name}}.",
                align: "left",
                padding: {
                  top: 10,
                  left: 0,
                  right: 0,
                  bottom: 10,
                },
              },
              type: "paragraph",
            },
            {
              id: "mR8rbp4-e1aXtcxTcKqmT",
              data: {
                href: "",
                text: 'Thank you for staying with "{{campaign.name}}". The project "{{project.name}}" will continue to send relevant information to {{contact.email}} whenever new events occur.',
                align: "left",
                padding: {
                  top: 10,
                  left: 0,
                  right: 0,
                  bottom: 10,
                },
              },
              type: "paragraph",
            },
          ],
        },
      ],
      settings: {
        align: "center",
        padding: {
          top: 12,
          left: 16,
          right: 16,
          bottom: 0,
        },
        fullWidth: false,
        backgroundColor: "#ffffff",
      },
    },
    {
      id: "pQrg6kHYtYRd92YH8Hawq",
      type: "row",
      columns: [
        {
          id: "3MEdfN7PHoFHBB_BdMmEX",
          width: 100,
          blocks: [
            {
              id: "CCCERlGUwDFs-WCiTlSAT",
              data: {
                href: "",
                text: "Best regards, <br/>\n<strong>Igor</strong><br/>\n{{project.name}}<br/>\n{{campaign.name}}<br/>\nEmail: {{contact.email}}",
                align: "left",
                padding: {
                  top: 10,
                  left: 0,
                  right: 0,
                  bottom: 10,
                },
              },
              type: "paragraph",
            },
          ],
        },
      ],
      settings: {
        align: "center",
        padding: {
          top: 12,
          left: 16,
          right: 16,
          bottom: 0,
        },
        fullWidth: false,
        backgroundColor: "#ffffff",
      },
    },
  ],
  version: 1,
  settings: {
    textColor: "#111827",
    fontFamily: "Arial, sans-serif",
    contentWidth: 600,
    backgroundColor: "#f9fafb",
  },
};
