import { useState, type ChangeEvent, type ChangeEventHandler } from 'react';
import { company } from '../../data/company';
import Field from '../form/Field';
import Icon from '../form/Icon';
import Input from '../form/Input';

import './Request.css';
import { Checkbox } from '../form/Checkbox';

export default function Request() {
    const benefits = [
        'Отвечаем в рабочее время в течение 15 минут',
        'Подбираем маршрут платежа под вашу страну и валюту',
        'Фиксируем курс на время сделки',
    ];

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        comment: '',
        privacyAgreement: false,
        marketingAgreement: false,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit: ChangeEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        // Здесь логика отправки на бэкенд (например, fetch или axios)
        console.log('Данные формы для отправки:', formData);
    };

    return (
        <section id="request" className="lead reveal-box" aria-labelledby="form-heading" suppressHydrationWarning>
            <div className="lead-wrapper">
                <div className="lead-info">
                    <h2>
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

                    <span className="lead-info__separator" aria-hidden="true"></span>

                    <address className="contacts-block">
                        <span id="email-label">Почта</span>
                        <a 
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                            onChange={handleChange}
                        />

                        <Checkbox 
                            id="marketingAgreement" 
                            label="Даю согласие на получение информационной и рекламной рассылки"
                            checked={formData.marketingAgreement}
                            onChange={handleChange}
                        />
                    </fieldset>

                    <p className="required-note" aria-hidden="true">*Обязательное поле для заполнения</p>

                    <button type="submit" className="btn btn--lg btn--primary btn--block btn-submit">Отправить заявку</button>
                </form>
            </div>
        </section>
    );
}
