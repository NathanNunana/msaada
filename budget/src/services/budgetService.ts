import Budget, { BudgetI } from "../database/budgetsModel";

export class BudgetService {
  async saveBudget(data: BudgetI) {
    const budget = await Budget.create({
      user_id: data.user_id,
      budget_type: data.budget_type,
      description: data.description,
      amount: data.amount,
      tags: data.tags,
      notes: data.notes,
      account: data.account,
    });
    return budget;
  }
  async updateBudget(data: BudgetI) {
    const updatedBudget = await Budget.update({
      budget_type: data.budget_type,
      description: data.description,
      amount: data.amount,
      tags: data.tags,
      notes: data.notes,
      account: data.account,
    }, {
      where: { id: data.id }
    })
    return updatedBudget;
  }
  async deleteBudget(id: number) {
    const budget = await Budget.destroy({ where: { id: id } });
    return budget;
  }
  async getBudget(id: number) {
    const budget = await Budget.findOne({
      where: { id: id }
    });
    return budget;
  }
  async getBudgets() {
    const budgets = await Budget.findAll();
    return budgets;
  }
}
