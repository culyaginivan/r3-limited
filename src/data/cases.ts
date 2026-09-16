import vipPreview from "../assets/img/case-1.webp";
import uaePreview from "../assets/img/case-2.webp";
import chinaPreview from "../assets/img/case-3.webp";
import ukPreview from "../assets/img/case-4.webp";
import vipBanner from "../assets/img/banner-case-1.webp";
import uaeBanner from "../assets/img/banner-case-2.webp";
import chinaBanner from "../assets/img/banner-case-3.webp";
import ukBanner from "../assets/img/banner-case-4.webp";
import vipInvoice from "../assets/img/invoice-1.webp";
import uaeInvoice from "../assets/img/invoice-2.webp";
import chinaInvoice from "../assets/img/invoice-3.webp";
import ukInvoice from "../assets/img/invoice-4.webp"; 

export interface Params {
    commission: string;
    terms: string;
    geo: string;
}

export interface WorkProgress {
    problem: string;
    solution: string;
}

export interface Case {
    id: string;
    location: string;
    duration: string;
    title: string;
    image: {
        preview: ImageMetadata;
        banner: ImageMetadata;
    };
    results: string[];

    category: string;
    invoice: ImageMetadata;
    description: string;
    params: Params,
    work_progress: WorkProgress;
}

export const cases: Case[] = [
    {
        id: "vip",
        location: "США / Мексика / Канада",
        duration: "10 часов",
        title: "Оплата VIP-лож FIFA через проверенного плательщика",
        image: {
            preview: vipPreview,
            banner: vipBanner,
        },
        results: [
            "<strong>Билеты на футбольный праздник — уже на следующий день.</strong> Клиент получил их на электронную почту.",
            "<strong>Сэкономили деньги и снизили финансовые риски.</strong> При неуспешной оплате могли возникнуть штрафные санкции или отмена бронирования.",
            "<strong>Оформили сделку по официальному ВЭД-контракту.</strong> Туроператор официально перечислил денежные средства на наш счёт.",
        ],
        category: "Оплата мероприятий",
        invoice: vipInvoice,
        description: "",
        params: {
            commission: "1,5%",
            terms: "10 часов",
            geo: "США"
        },
        work_progress: {
            problem: "Оплатить VIP ложи во время финалов и 1/4 чемпионата Мира по Футболу.  Так как оплата была на официальные реквизиты FIFA это требовало высоких стандартов плательщика.",
            solution: "Предложили клиенту несколько компаний с безупречной репутацией на выбор. После верификации компании получателем денежных средств, мы провели платеж в евро с Британской компании."
        }
    },
    {
        id: "uae",
        location: "ОАЭ",
        duration: "10 часов",
        title: "Срочная оплата рентгеновского оборудования в ОАЭ",
        image: {
            preview: uaePreview,
            banner: uaeBanner,
        },
        results: [
            "<strong>Оплата в течение нескольких часов</strong> поступила на счёт клиента.",
            "<strong>Заказ оперативно отгрузили</strong> и передали в обработку логистической службе.",
            "Провели оплату в соответствии со всеми требованиями законодательства РФ и предоставили <strong>полный комплект закрывающих документов.</strong>",
        ],
        category: "Медицина",
        invoice: uaeInvoice,
        description: "",
        params: {
            commission: "1,3%",
            terms: "10 часов",
            geo: "ОАЭ"
        },
        work_progress: {
            problem: "Клиент обратился к нам для оплаты рентген оборудования на большую сумму на счета крупнейшего ритейлера. Нужно было оплатить платеж в дирхамах и максимально быстро.",
            solution: "Предложили Дубайскую компанию которая давно представлена на рынке. После согласования с поставщиком оплатили инвойс."
        }
    },
    {
        id: "china",
        location: "Китай (Гонконг)",
        duration: "6 часов",
        title: "Оплата серверного оборудования в обход банковских ограничений",
        image: {
            preview: chinaPreview,
            banner: chinaBanner,
        },
        results: [
            "<strong>Через 6 часов</strong> после начала процесса поставщик подтвердил <strong>поступление средств.</strong>",
            "Оборудование было <strong>зарезервировано и отправлено</strong> логистическим партнёрам <strong>в тот же день.</strong>",
            "Клиент получил <strong>полный комплект закрывающих документов:</strong> инвойсы, платёжные поручения и акты сверки.",
            "<strong>Сроки поставки сохранены — оборудование уже в пути к клиенту.</strong>",
        ],
        category: "Оплата электроники",
        invoice: chinaInvoice,
        description: "",
        params: {
            commission: "0,9%",
            terms: "10 часов",
            geo: "Китай"
        },
        work_progress: {
            problem: "Клиент обратился к нам для оплаты крупной партии серверного оборудования и комплектующих для дата-центров. Поставщик — крупный трейдер в Гонконге — требовал оплату в долларах в течение суток, иначе резервирование товара аннулировалось. Проблема была в том, что прямое перечисление из РФ заблокировали комплаенс-службы банка-корреспондента из-за санкционных рисков.",
            solution: "Предложили схему оплаты через проверенного партнёра в Сингапуре с мультивалютным счетом. После проведения комплексной проверки (KYC) контрагента и согласования деталей с поставщиком, мы выставили инвойс через сингапурскую структуру и оперативно провели платёж по SWIFT с полным пакетом подтверждающих документов."
        }
    },
    {
        id: "uk",
        location: "Великобритания",
        duration: "14 часов",
        title: "Оплата чартерного рейса в Великобритании за 14 часов",
        image: {
            preview: ukPreview,
            banner: ukBanner,
        },
        results: [
            "Через 14 часов британский оператор подтвердил <strong>поступление средств в полном объёме.</strong>",
            "<strong>Рейс выполнен по расписанию</strong> — все аэропортовые службы получили оплату вовремя.",
            "Клиент получил <strong>полный комплект закрывающих документов</strong>: инвойсы, платёжные поручения и акты сверки с транзитным партнёром — в соответствии с требованиями российского валютного законодательства к авиационным услугам.",
        ],
        category: "Воздушное судно",
        invoice: ukInvoice,
        description: "",
        params: {
            commission: "1,1%",
            terms: "10 часов",
            geo: "Великобритания"
        },
        work_progress: {
            problem: "Клиент — российская авиакомпания — обратился к нам для оплаты чартерного рейса по маршруту Москва — Лондон. Судно (Gulfstream 650 ER) было забронировано под групповой туристический чартер. Иностранный оператор услуг (техническое обслуживание, топливозаправка и аэропортовые сборы в Лондоне) выставил счёт в долларах США с оплатой в течение 24 часов.",
            solution: "Предложили оплту через официального партнёра в Британии, имеющего прямые договорные отношения с британским наземным хендлером. Провели юридическую экспертизу контракта и запустили международный SWIFT-перевод с полным пакетом сопроводительных документов (договор фрахта, смета сборов, акт приёмки ВС) через партнёрскую структуру."
        }
    },
];