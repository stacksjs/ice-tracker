import type { PaymentTransactionsTable, UserModelType } from '@stacksjs/orm'
import { db } from '@stacksjs/database'

export interface ManageTransaction {
  store: (user: UserModelType, productId: number) => Promise<PaymentTransactionsTable | undefined>
  list: (user: UserModelType) => Promise<PaymentTransactionsTable[]>
}

export const manageTransaction: ManageTransaction = (() => {
  async function store(user: UserModelType, productId: number): Promise<PaymentTransactionsTable | undefined> {
    const product = await db.selectFrom('payment_products').where('id', '=', productId).selectAll().executeTakeFirst()

    const data = {
      name: product?.name,
      description: '',
      amount: product?.unit_price,
      brand: 'visa',
      type: 'one-time',
      provider_id: '312321312',
      user_id: user.id,
    }

    const createdTransaction = await db.insertInto('payment_transactions').values(data).executeTakeFirst()

    const transaction = await db.selectFrom('payment_transactions').where('id', '=', Number(createdTransaction.insertId)).selectAll().executeTakeFirst()

    return transaction
  }

  async function list(user: UserModelType): Promise<PaymentTransactionsTable[]> {
    const transaction = await db.selectFrom('payment_transactions').where('user_id', '=', user.id).selectAll().execute()

    return transaction
  }

  return { store, list }
})()
