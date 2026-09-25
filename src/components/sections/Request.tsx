import { useState, type ChangeEvent, type FormEvent } from 'react';
import { company } from '../../data/company';
import Field from '../form/Field';
import Icon from '../form/Icon';
import Input from '../form/Input';

import './Request.css';
import { Checkbox } from '../form/Checkbox';

interface RequestForm {
    name: string;
    company: string;
    phone: string;
    email: string;
    comment: string;
    privacyAgreement: boolean;
    marketingAgreement: boolean;
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const emptyForm: RequestForm = {
    name: '',
    company: '',
    phone: '',
    email: '',
    comment: '',
    privacyAgreement: false,
    marketingAgreement: false,
};

function escapeHtml(value: string): string {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
}

function formatLeadMessage(data: RequestForm): string {
    return [
        '<b>Новая заявка с сайта</b>',
        '',
        `<b>Имя:</b> ${escapeHtml(data.name.trim())}`,
        `<b>Компания:</b> ${escapeHtml(data.company.trim())}`,
        `<b>Телефон:</b> ${escapeHtml(data.phone.trim())}`,
        `<b>Почта:</b> ${escapeHtml(data.email.trim())}`,
        `<b>Комментарий:</b> ${escapeHtml(data.comment.trim())}`,
        `<b>Согласие на обработку данных:</b> ${data.privacyAgreement ? 'да' : 'нет'}`,
        `<b>Согласие на рассылку:</b> ${data.marketingAgreement ? 'да' : 'нет'}`,
    ].join('\n');
}

async function sendLead(text: string): Promise<void> {
    const gateway = import.meta.env.PUBLIC_TG_GATEWAY?.replace(/\/$/, '');
    const secret = import.meta.env.PUBLIC_TG_APP_SECRET;

    if (!gateway || !secret) {
        throw new Error('Telegram proxy is not configured');
    }

    const response = await fetch(`${gateway}/tg/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-App-Secret': secret,
        },
        body: JSON.stringify({
            text,
            parse_mode: 'HTML',
        }),
    });

    if (!response.ok) {
        throw new Error('Telegram proxy request failed');
    }

    const payload = (await response.json()) as { ok?: boolean };

    if (!payload.ok) {
        throw new Error('Telegram rejected the message');
    }
}

export default function Request() {
    const benefits = [
        'Отвечаем в рабочее время в течение 15 минут',
        'Подбираем маршрут платежа под вашу страну и валюту',
        'Фиксируем курс на время сделки',
    ];

    const [formData, setFormData] = useState<RequestForm>(emptyForm);
    const [status, setStatus] = useState<SubmitStatus>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>, key: keyof RequestForm) => {
        const { value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [key]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (status === 'sending') {
            return;
        }

        const text = formatLeadMessage(formData);

        setStatus('sending');
        setStatusMessage('');

        try {
            await sendLead(text);
            setFormData(emptyForm);
            setStatus('success');
            setStatusMessage('Заявка отправлена. Мы свяжемся с вами в рабочее время.');
        } catch {
            setStatus('error');
            setStatusMessage('Не удалось отправить заявку. Попробуйте ещё раз или напишите на почту.');
        }
    };

    return (
        <section id="request" className="lead reveal-box" aria-labelledby="form-heading" suppressHydrationWarning>
            <div className="lead-wrapper">
                <div className="lead-info">
                    <h2 id="form-heading">
                        Оставьте заявку, чтобы узнать подробности
                    </h2>

                    <ul className="benefits-list">
                        {benefits.map(benefit => (
                            <li key={benefit}>
                                <Icon name="check" aria-hidden="true"/>
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>

                    <span className="lead-info__separator max-md:hidden" aria-hidden="true"></span>

                    <address className="contacts-block">
                        <span id="email-label">Почта</span>
                        <a 
                            className="font-semibold text-2xl/7 max-md:text-xl/6"
                            href={'mailto:' + company.email} 
                            aria-labelledby="email-label" 
                            itemProp="email"
                        >{company.email}</a>
                    </address>
                </div>

                <form className="lead-form" autoComplete="on" onSubmit={handleSubmit}>
                    <div className="inputs-grid">
                        <Field id="l-user-name" label="Ваше имя" required>
                            <Input
                                id="l-user-name"
                                placeholder="Александр"
                                name="l-user-name"
                                autoComplete="name"
                                type="text"
                                required
                                inputMode="text"
                                value={formData.name}
                                onChange={(e) => handleChange(e, 'name')}
                            />
                        </Field>
                        <Field id="l-company-name" label="Комания" required>
                            <Input
                                id="l-company-name"
                                placeholder="Название компании"
                                name="l-company-name"
                                autoComplete="organization"
                                type="text"
                                inputMode="text"
                                required
                                value={formData.company}
                                onChange={(e) => handleChange(e, 'company')}
                            />
                        </Field>
                        <Field id="l-user-phone" label="Телефон" required>
                            <Input
                                id="l-user-phone"
                                placeholder="+7 999 999 99 99"
                                name="l-user-phone"
                                inputMode="tel"
                                autoComplete="tel"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => handleChange(e, 'phone')}
                            />
                        </Field>
                        <Field id="l-user-email" label="Почта" required>
                            <Input
                                id="l-user-email"
                                placeholder="Alex.97@gmail.com"
                                name="l-user-email"
                                inputMode="email"
                                autoComplete="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => handleChange(e, 'email')}
                            />
                        </Field>
                        <Field id="l-user-comment" label="Комментарий" className="field-comment" required>
                            <Input
                                id="l-user-comment"
                                placeholder="Страна, валюта, сумма"
                                name="l-user-comment"
                                inputMode="text"
                                required
                                type="text"
                                value={formData.comment}
                                onChange={(e) => handleChange(e, 'comment')}
                            />
                        </Field>
                    </div>

                    <fieldset className="agreement-fieldset">
                        <legend className="sr-only">Согласия и разрешения</legend>
                        
                        <Checkbox 
                            id="privacyAgreement" 
                            label="Даю согласие на обработку и передачу персональных данных*"
                            required
                            checked={formData.privacyAgreement}
                            onChange={(e) => handleChange(e, 'privacyAgreement')}
                        />

                        <Checkbox 
                            id="marketingAgreement" 
                            label="Даю согласие на получение информационной и рекламной рассылки"
                            checked={formData.marketingAgreement}
                            onChange={(e) => handleChange(e, 'marketingAgreement')}
                        />
                    </fieldset>

                    <p className="required-note" aria-hidden="true">*Обязательное поле для заполнения</p>

                    <button
                        type="submit"
                        className="btn btn--lg btn--primary btn--block btn-submit"
                        disabled={status === 'sending'}
                        aria-busy={status === 'sending'}
                    >
                        {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
                    </button>

                    <p className={status === 'idle' ? 'form-status' : `form-status form-status--${status}`} role="status" aria-live="polite">{statusMessage}</p>
                </form>
            </div>
        </section>
    );
}
