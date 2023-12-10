import { IconType } from "react-icons";
import { Stripe } from 'stripe'

export interface IRoute {
    label: string,
    icon: IconType,
    active?: boolean,
    href: string
}

export interface IUserDetails {
    id: string,
    firstName: string,
    lastName: string,
    fullName?: string,
    avatar?: string,
    billingAddress?: Stripe.Address
    paymentMethod?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type]
}

export interface IProduct {
    id: string,
    active?: boolean,
    name?: string,
    description?: string,
    image?: string,
    metaData?: Stripe.Metadata,
}

export interface IPrice {
    id: string,
    productId?: string,
    active?: boolean,
    description?: string,
    unitAmount?: number
    currency?: string,
    type?: Stripe.Price.Type,
    interval?: Stripe.Price.Recurring.Interval,
    intervalCount?: number,
    trialPeriodDays?: number | null
    metaData?: Stripe.Metadata,
    products?: IProduct
}

export interface ISubscription {
    id: string,
    userId: string,
    status?: Stripe.Subscription.Status,
    metaData?: Stripe.Metadata,
    priceId?: string,
    quantity?: number,
    cancelAtPeriodEnd?: boolean
    created: string,
    currentPeriodStart: string
    currentPeriodEnd: string
    ended_at?: string,
    cancel_at?: string,
    canceled_at?: string,
    trial_start?: string,
    trial_end?: string,
    prices?: IPrice
}

export interface IModal {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export interface ISong {
    id: string,
    user_id: string,
    title: string,
    author: string,
    song_path: string,
    image_path: string
}