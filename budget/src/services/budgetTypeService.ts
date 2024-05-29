import { BudgetType, BudgetTypeI } from "../database/budgetTypeModel";

export class BudgetTypeService {
  async saveBudgetType(data: BudgetTypeI) {
    console.log("Here")
    const budget = await BudgetType.create({
      name: data.name,
      description: data.description,
    });
    console.log(budget)
    return budget;
  }
  async updateBudgetType(data: BudgetTypeI) {
    const budget = await BudgetType.update({
      name: data.name,
      description: data.description,
    }, { where: { id: data.id } });
    return budget;
  }
  async deleteBudgetType(id: number) {
    const budget = await BudgetType.destroy({
      where: { id: id }
    })
    return budget;
  }
  async getBudgetType(id: number) {
    const budget = await BudgetType.findOne({
      where: { id: id }
    });
    return budget;
  }
  async getBudgetTypes() {
    const budgets = await BudgetType.findAll();
    return budgets;
  }
}
