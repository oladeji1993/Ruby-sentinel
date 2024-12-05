import { Component } from '@angular/core';

@Component({
  selector: 'app-monitored-event',
  templateUrl: './monitored-event.component.html',
  styleUrls: ['./monitored-event.component.scss'],
})
export class MonitoredEventComponent {
  events = [
    {
      title: 'Change of Password',
      event: 'password_change',
      category: 'Authentication Event',
      description: 'Describes when a user changes their password.',
    },
    {
      title: 'Reset PIN',
      event: 'pin_reset',
      category: 'Authentication Event',
      description: 'Describes when a user resets their PIN on a platform.',
    },
    {
      title: 'Security Question Reset',
      event: 'security_question_reset',
      category: 'Authentication Event',
      description:
        'Describes when a user resets their security questions on a platform.',
    },
    {
      title: 'Risk Priority Score',
      event: 'risk_score',
      category: 'Authentication Event',
      description:
        'Describes when a transaction/user/account attains a certain risk score.',
    },
    {
      title: 'Update Mobile Number',
      event: 'mobileno_update',
      category: 'Account Management Events',
      description:
        'Describes when a user changes their mobile phone number tied to a platform.',
    },
    {
      title: 'Update Email Address',
      event: 'email_update',
      category: 'Account Management Events',
      description:
        'Describes when a user changes their email address tied to a platform.',
    },
    {
      title: 'Stop SMS Alerts',
      event: 'stop_sms_alert',
      category: 'Account Management Events',
      description:
        'Describes when a user stops SMS alert notifications tied to an account.',
    },
    {
      title: 'Stop Email Alerts',
      event: 'stop_email_alert',
      category: 'Account Management Events',
      description:
        'Describes when a user stops email alert notifications tied to an account.',
    },
    {
      title: 'Transaction Remarks',
      event: 'transfer_description',
      category: 'Transactional Events',
      description: 'Identifies certain keywords in transfer remarks.',
    },
    {
      title: 'Average Transaction Amount Last 30 Days',
      event: 'average_transaction_amount_in_ngn_monthly',
      category: 'Transactional Events',
      description:
        'Describes when a user performs a total transaction of NGN20 in the last 30 days.',
    },
    {
      title: 'Change of Device',
      event: 'device_change',
      category: 'Security and Permission Events',
      description:
        'Describes when a user changes their device tied to a platform.',
    },
    {
      title: 'Activate 2FA',
      event: 'token_activation',
      category: 'Security and Permission Events',
      description:
        'Describes when a user activates their token or 2FA tied to a platform.',
    },
    {
      title: 'Change User Role',
      event: 'change_user_role',
      category: 'Security and Permission Events',
      description: 'Describes changes to a user role on a platform.',
    },
  ];
}