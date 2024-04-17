import BudgetType, { BudgetTypeI } from "../database/budgetTypeModel";

export class BudgetTypeService {
  async saveBudget(data: BudgetTypeI) {
    const budget = await BudgetType.create({
      name: data.name,
      description: data.description,
    });
    return budget;
  }
  async updateBudget(data: BudgetTypeI) {
    const budget = await BudgetType.update({
      name: data.name,
      description: data.description,
    }, { where: { id: data.id } });
    return budget;
  }
  async deleteBudget(id: number) {
    const budget = await BudgetType.destroy({
      where: { id: id }
    })
    return budget;
  }
  async getBudget(id: number) {
    const budget = await BudgetType.findOne({
      where: { id: id }
    });
    return budget;
  }
  async getBudgets() {
    const budgets = await BudgetType.findAll();
    return budgets;
  }
}
