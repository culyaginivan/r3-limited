import { useState } from 'react';
import { countries } from '../../data/countries';
import { currencies } from '../../data/currency';
import Field from '../form/Field';
import Input from '../form/Input';
import Icon from '../form/Icon';
import Select, { type Option } from '../form/Select';
import Dropzone from '../form/Dropzone';
import './Calculator.css';

const paymentReference: Option[] = [
  { value: 'goods', label: 'Оплата товара' },
  { value: 'services', label: 'Оплата услуг' },
  { value: 'logistics', label: 'Транспорт и логистика' },
  { value: 'royalties', label: 'Лицензии и роялти' },
  { value: 'other', label: 'Прочее' },
];
const wayFunding: Option[] = [
  { value: 'rub', label: 'Рубли с расчётного счёта' },
  { value: 'currency', label: 'Валюта с валютного счёта' },
];
const rates: Record<string, number> = { SNY: 12.769, USD: 92.4, AED: 25.2, TRY: 2.85, RUB: 1 };

export default function Calculator() {
  const [from, setFrom] = useState(countries[2].value);
  const [to, setTo] = useState(countries[0].value);
  const [amount, setAmount] = useState('300000');
  const [currency, setCurrency] = useState(currencies[0].value);
  const [purpose, setPurpose] = useState('');
  const [funding, setFunding] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const numericAmount = Math.max(0, Number(amount.replace(/\s/g, '').replace(',', '.')) || 0);
  const rate = rates[currency] ?? rates.SNY;
  const body = numericAmount * rate;
  const feeRate = numericAmount >= 1000000 ? 0.003 : 0.006;
  const fee = body * feeRate;
  const total = body + fee;
  const format = (value: number) =>
    new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value);
  const reset = () => {
    setFrom(countries[2].value);
    setTo(countries[0].value);
    setAmount('300000');
    setCurrency(currencies[0].value);
    setPurpose('');
    setFunding('');
    setFile(null);
  };
  const selectedCurrency = currencies.find((item) => item.value === currency);
  return (
    <section className="calc reveal-box" id="calculator" suppressHydrationWarning={true}>
      <h2 className="sr-only">Калькулятор платежа</h2>
      <div className="calc__summary">
        <dl className="calc__facts">
          <div className="calc__fact">
            <dt>Комиссия</dt>
            <dd>{(feeRate * 100).toFixed(1).replace('.', ',')} %</dd>
          </div>
          <div className="calc__fact">
            <dt>Курс ЦБ</dt>
            <dd>{rate.toLocaleString('ru-RU', { maximumFractionDigits: 3 })} ₽</dd>
          </div>
          <div className="calc__fact">
            <dt>Срок</dt>
            <dd>{feeRate === 0.003 ? '30–60 минут' : '1 день'}</dd>
          </div>
        </dl>
        <button className="btn btn--lg btn--secondary" type="button" onClick={reset}>
          Сбросить
        </button>
      </div>
      <form className="calc__body" onSubmit={(event) => event.preventDefault()}>
        <div className="calc__form">
          <div className="calc__fields">
            <Field id="c-from" label="Страна отправления платежа" required>
              <Select
                id="c-from"
                value={from}
                options={countries}
                placeholder="Выберите страну отправления"
                onChange={setFrom}
              />
            </Field>
            <Field id="c-to" label="Страна получателя платежа" required>
              <Select
                id="c-to"
                value={to}
                options={countries}
                placeholder="Выберите назначение"
                onChange={setTo}
              />
            </Field>
            <Field id="c-amount" label="Сумма инвойса">
              <div className="field-combined">
                <Input
                  id="c-amount"
                  inputMode="numeric"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
                <Select
                  id="c-amount-select"
                  value={currency}
                  options={currencies}
                  placeholder="Валюта"
                  ariaLabel="Выберите валюту суммы инвойса"
                  onChange={setCurrency}
                  className="field-combined__suffix"
                  selectedTemplate={(option) =>
                    option ? (
                      <>
                        {option.icon && <Icon className="select__icon" name={option.icon} />}
                        <span>{option.value}</span>
                      </>
                    ) : (
                      'Валюта'
                    )
                  }
                  optionTemplate={(option) => (
                    <>
                      {option.icon && <Icon className="select__icon" name={option.icon} />}
                      <span>{option.value}</span>
                      <span className="select__hint">{option.label}</span>
                    </>
                  )}
                />
              </div>
            </Field>
          </div>
          <div className="calc__optional">
            <p className="calc__optional-title">Уточнить расчёт — необязательно</p>
            <div className="calc__pair">
              <Field id="c-purpose" label="Назначение платежа" required>
                <Select
                  id="c-purpose"
                  value={purpose}
                  options={paymentReference}
                  placeholder="Выберите назначение"
                  onChange={setPurpose}
                />
              </Field>
              <Field id="c-funding" label="Способ фондирования" required>
                <Select
                  id="c-funding"
                  value={funding}
                  options={wayFunding}
                  placeholder="Выберите способ"
                  onChange={setFunding}
                />
              </Field>
            </div>
            <Dropzone file={file} onFile={setFile} />
          </div>
          <small className="calc__note">
            Расчёт предварительный и носит справочный характер. Итоговая сумма зависит от курса на
            день проведения платежа, валюты и назначения перевода — точные условия менеджер
            подтверждает после проверки инвойса и документов.
          </small>
        </div>
        <aside className="quote">
          <h3 className="h3">Расчёт</h3>
          <dl className="quote__rows">
            <div className="quote__row">
              <dt>Сумма инвойса</dt>
              <dd>
                {format(numericAmount)} {selectedCurrency?.value}
              </dd>
            </div>
            <div className="quote__row">
              <dt>Курс ЦБ</dt>
              <dd>{rate.toLocaleString('ru-RU', { maximumFractionDigits: 3 })} ₽</dd>
            </div>
            <div className="quote__row">
              <dt>Тело платежа</dt>
              <dd>{format(body)} ₽</dd>
            </div>
            <div className="quote__row">
              <dt>Комиссия ({(feeRate * 100).toFixed(1).replace('.', ',')}%)</dt>
              <dd>{format(fee)} ₽</dd>
            </div>
            <div className="quote__row">
              <dt>Срок зачисления</dt>
              <dd>{feeRate === 0.003 ? '30–60 минут' : '1 день'}</dd>
            </div>
          </dl>
          <span className="quote__spacer" aria-hidden="true" />
          <div className="quote__total">
            <p className="quote__total-label">Сумма платежа</p>
            <p className="quote__total-value">{format(total)} ₽</p>
          </div>
          <a href="#request" className="btn btn--lg btn--primary btn--block" type="button">
            Оставить заявку
          </a>
        </aside>
      </form>
    </section>
  );
}
