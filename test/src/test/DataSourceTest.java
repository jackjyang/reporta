package test;

import java.util.List;

import org.junit.Assert;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class DataSourceTest {

	private static String name1 = "test1";
	private static String name2 = "test2";
	private static int threadSleep = 2500;

	private WebDriver getDriver() throws InterruptedException {
		System.setProperty("webdriver.chrome.driver",
				"c://Users//Jerry Cheng//Desktop//uni//FYDP//reporta//test//lib//chromedriver.exe");

		ChromeOptions options = new ChromeOptions();
		System.setProperty("webdriver.chrome.args", "--disable-logging");
		System.setProperty("webdriver.chrome.silentOutput", "true");
		WebDriver driver = new ChromeDriver(options);

		String url = "localhost:8080";
		driver.get(url);

		WebElement dataSourceButton = driver.findElement(By.id("data_sources"));
		dataSourceButton.click();

		Thread.sleep(5000); // need to wait for data source dropdown to populate

		return driver;
	}

	private void createDataSource(WebDriver driver) throws InterruptedException {
		WebElement newDataSourceButton = driver.findElement(By.xpath("//*[contains(text(), 'New Data Source')]"));

		newDataSourceButton.click();

		WebElement dialog = driver.findElement(By.className("modal-content"));

		WebElement modalBody = dialog.findElement(By.className("modal-body"));

		WebElement nameTextField = modalBody.findElement(By.tagName("input"));
		nameTextField.sendKeys(name1);

		WebElement dropDown = modalBody.findElement(By.className("dropdown"));
		WebElement dropDownButton = dropDown.findElement(By.className("btn"));
		dropDownButton.click();

		// WebElement dataSourceOption =
		// dropDown.findElement(By.xpath("//*[contains(text(), 'CAN')]"));
		// TODO: occasionally fail here if no data
		WebElement dataSourceOption = dropDown.findElement(By.tagName("li"));
		dataSourceOption.click();

		WebElement modalFooter = dialog.findElement(By.className("modal-footer"));

		WebElement newDataSourceSaveButton = modalFooter.findElement(By.xpath("//*[contains(text(), 'Save')]"));
		newDataSourceSaveButton.click();
		Thread.sleep(threadSleep);
	}

	private void deleteDataSources(WebDriver driver) throws InterruptedException {
		WebElement table = driver.findElement(By.className("table"));

		// checks first row in table has name 'test1'
		while (true) {
			List<WebElement> trs = table.findElements(By.className("accordion-toggle"));
			if (trs.isEmpty())
				break;

			WebElement tr = trs.get(0);
			tr.click();
			Thread.sleep(threadSleep);

			WebElement deleteButton = table.findElements(By.tagName("button")).get(2);
			deleteButton.click();

			WebElement dialog = driver.findElement(By.className("modal-content"));
			WebElement modalFooter = dialog.findElement(By.className("modal-footer"));
			WebElement deleteButton2 = modalFooter.findElements(By.className("btn")).get(1);
			deleteButton2.click();

			Thread.sleep(threadSleep);
		}

	}

	@Test
	public void pageTitleTest() throws InterruptedException {
		WebDriver driver = getDriver();

		String pageTitle = driver.getTitle();
		Assert.assertEquals(pageTitle, "Reporta");

		driver.quit();
	}

	@Test
	public void frameTitleTest() throws InterruptedException {
		WebDriver driver = getDriver();

		WebElement title = driver.findElement(By.tagName("h2"));
		Assert.assertEquals(title.getText(), "Data Sources");

		driver.quit();
	}

	@Test
	public void viewContainerTest() throws InterruptedException {
		WebDriver driver = getDriver();

		driver.findElement(By.id("viewContainer"));

		driver.quit();
	}

	@Test
	public void newDataSourceButtonTest() throws InterruptedException {
		WebDriver driver = getDriver();

		driver.findElement(By.xpath("//*[contains(text(), 'New Data Source')]"));

		driver.quit();
	}

	@Test
	public void newDataSourceDialogTest() throws InterruptedException {
		WebDriver driver = getDriver();

		WebElement newDataSourceButton = driver.findElement(By.xpath("//*[contains(text(), 'New Data Source')]"));

		newDataSourceButton.click();

		WebElement dialog = driver.findElement(By.className("modal-content"));

		WebElement modalHeader = dialog.findElement(By.className("modal-header"));
		modalHeader.findElement(By.xpath("//*[contains(text(), 'Create Data Source')]"));

		WebElement modalBody = dialog.findElement(By.className("modal-body"));
		modalBody.findElement(By.xpath("//*[contains(text(), 'Name:')]"));
		WebElement nameTextField = modalBody.findElement(By.tagName("input"));
		Assert.assertEquals(nameTextField.getText(), "");
		modalBody.findElement(By.xpath("//*[contains(text(), 'System:')]"));
		modalBody.findElement(By.className("dropdown-menu"));

		WebElement modalFooter = dialog.findElement(By.className("modal-footer"));
		modalFooter.findElement(By.xpath("//*[contains(text(), 'Save')]"));
		modalFooter.findElement(By.xpath("//*[contains(text(), 'Cancel')]"));

		driver.quit();
	}

	@Test
	public void newDataSourceDialogSaveTest() throws InterruptedException {
		WebDriver driver = getDriver();
		createDataSource(driver);

		List<WebElement> dialog2 = driver.findElements(By.className("modal-content"));

		Assert.assertTrue(dialog2.isEmpty());

		WebElement table = driver.findElement(By.className("table"));

		// checks first row in table has name 'test1'
		List<WebElement> trs = table.findElements(By.className("accordion-toggle"));

		List<WebElement> tds = trs.get(0).findElements(By.className("ng-binding"));
		Assert.assertEquals(tds.get(0).getText(), name1);

		deleteDataSources(driver);

		driver.quit();
	}

	@Test
	public void dataSourceEditSaveTest() throws InterruptedException {
		// runs after new data source test has completed
		WebDriver driver = getDriver();
		createDataSource(driver);

		WebElement table = driver.findElement(By.className("table"));

		// checks first row in table has name 'test1'
		WebElement tb = table.findElement(By.tagName("tbody"));
		WebElement tr = tb.findElement(By.className("accordion-toggle"));
		tr.click();
		Thread.sleep(threadSleep);

		WebElement hiddenRow = tb.findElement(By.className("accordian-body"));
		WebElement buttonGroup = hiddenRow.findElement(By.className("btn-group"));
		WebElement editButton = buttonGroup.findElements(By.tagName("button")).get(0);

		editButton.click();
		Thread.sleep(threadSleep);

		// modify name
		WebElement dialog = driver.findElement(By.className("modal-content"));
		WebElement modalBody = dialog.findElement(By.className("modal-body"));
		WebElement nameTextField = modalBody.findElement(By.tagName("input"));

		nameTextField.clear();
		nameTextField.sendKeys(name2);

		// modify system
		WebElement dropDown = modalBody.findElement(By.className("dropdown"));
		WebElement dropDownButton = dropDown.findElement(By.className("btn"));
		dropDownButton.click();

		List<WebElement> dataSourceOptions = dropDown.findElements(By.tagName("li"));
		dataSourceOptions.get(1).click(); // QNX

		WebElement modalFooter = dialog.findElement(By.className("modal-footer"));
		WebElement newDataSourceSaveButton = modalFooter.findElement(By.xpath("//*[contains(text(), 'Save')]"));
		newDataSourceSaveButton.click();
		Thread.sleep(threadSleep);

		// WebElement hiddenRow =
		// tbs.get(0).findElement(By.className("accordian-body"));
		// name is now changed
		tr.findElement(By.xpath("//*[contains(text(), 'test2')]"));

		List<WebElement> trs = hiddenRow.findElements(By.tagName("tr"));
		trs.get(0).findElement(By.xpath("//*[contains(text(), 'QNX')]"));
		// TODO: check date has changed

		tr.click();
		Thread.sleep(threadSleep);

		deleteDataSources(driver);
		driver.quit();
	}

	@Test
	public void dataSourceEditCancelTest() throws InterruptedException {
		// runs after new data source test has completed
		WebDriver driver = getDriver();
		createDataSource(driver);

		WebElement table = driver.findElement(By.className("table"));

		// checks first row in table has name 'test1'
		WebElement tb = table.findElement(By.tagName("tbody"));
		WebElement tr = tb.findElement(By.className("accordion-toggle"));
		tr.click();
		Thread.sleep(threadSleep);

		WebElement hiddenRow = tb.findElement(By.className("accordian-body"));
		WebElement buttonGroup = hiddenRow.findElement(By.className("btn-group"));
		WebElement editButton = buttonGroup.findElements(By.tagName("button")).get(0);

		editButton.click();
		Thread.sleep(threadSleep);

		// modify name
		WebElement dialog = driver.findElement(By.className("modal-content"));
		WebElement modalBody = dialog.findElement(By.className("modal-body"));
		WebElement nameTextField = modalBody.findElement(By.tagName("input"));

		nameTextField.clear();
		nameTextField.sendKeys(name2);

		// modify system
		WebElement dropDown = modalBody.findElement(By.className("dropdown"));
		WebElement dropDownButton = dropDown.findElement(By.className("btn"));
		dropDownButton.click();

		List<WebElement> dataSourceOptions = dropDown.findElements(By.tagName("li"));
		dataSourceOptions.get(1).click(); // QNX

		WebElement modalFooter = dialog.findElement(By.className("modal-footer"));
		WebElement newDataSourceSaveButton = modalFooter.findElement(By.xpath("//*[contains(text(), 'Cancel')]"));
		newDataSourceSaveButton.click();
		Thread.sleep(threadSleep);

		// WebElement hiddenRow =
		// tbs.get(0).findElement(By.className("accordian-body"));
		// name is now changed
		tr.findElement(By.xpath("//*[contains(text(), 'test1')]"));

		List<WebElement> trs = hiddenRow.findElements(By.tagName("tr"));
		trs.get(0).findElement(By.xpath("//*[contains(text(), 'CAN')]"));
		// TODO: check date has changed

		tr.click();
		Thread.sleep(threadSleep);

		deleteDataSources(driver);

		driver.quit();
	}

	@Test
	public void dataSourceCloneSaveTest() throws InterruptedException {
		WebDriver driver = getDriver();
		createDataSource(driver);

		WebElement table = driver.findElement(By.className("table"));

		// checks first row in table has name 'test1'
		WebElement tb = table.findElement(By.tagName("tbody"));
		WebElement tr = tb.findElement(By.className("accordion-toggle"));
		tr.click();
		Thread.sleep(threadSleep);

		WebElement hiddenRow = tb.findElement(By.className("accordian-body"));
		WebElement buttonGroup = hiddenRow.findElement(By.className("btn-group"));
		WebElement cloneButton = buttonGroup.findElements(By.tagName("button")).get(1);

		cloneButton.click();
		Thread.sleep(threadSleep);

		// modify name
		WebElement dialog = driver.findElement(By.className("modal-content"));
		WebElement modalBody = dialog.findElement(By.className("modal-body"));
		WebElement nameTextField = modalBody.findElement(By.tagName("input"));

		nameTextField.clear();
		nameTextField.sendKeys(name2);

		WebElement modalFooter = dialog.findElement(By.className("modal-footer"));
		WebElement newDataSourceSaveButton = modalFooter.findElement(By.xpath("//*[contains(text(), 'Save')]"));
		newDataSourceSaveButton.click();
		Thread.sleep(threadSleep);

		table.findElement(By.xpath("//*[contains(text(), 'test1')]"));
		table.findElement(By.xpath("//*[contains(text(), 'test2')]"));

		deleteDataSources(driver);
		driver.quit();
	}

	@Test
	public void dataSourceCloneCancelTest() throws InterruptedException {
		WebDriver driver = getDriver();
		createDataSource(driver);

		WebElement table = driver.findElement(By.className("table"));

		// checks first row in table has name 'test1'
		WebElement tb = table.findElement(By.tagName("tbody"));
		WebElement tr = tb.findElement(By.className("accordion-toggle"));
		tr.click();
		Thread.sleep(threadSleep);

		WebElement hiddenRow = tb.findElement(By.className("accordian-body"));
		WebElement buttonGroup = hiddenRow.findElement(By.className("btn-group"));
		WebElement cloneButton = buttonGroup.findElements(By.tagName("button")).get(1);

		cloneButton.click();
		Thread.sleep(threadSleep);

		// modify name
		WebElement dialog = driver.findElement(By.className("modal-content"));
		WebElement modalBody = dialog.findElement(By.className("modal-body"));
		WebElement nameTextField = modalBody.findElement(By.tagName("input"));

		nameTextField.clear();
		nameTextField.sendKeys(name1);

		WebElement modalFooter = dialog.findElement(By.className("modal-footer"));
		WebElement newDataSourceSaveButton = modalFooter.findElement(By.xpath("//*[contains(text(), 'Save')]"));
		newDataSourceSaveButton.click();
		Thread.sleep(threadSleep);

		table.findElement(By.xpath("//*[contains(text(), 'test1')]"));
		Assert.assertEquals(table.findElements(By.xpath("//*[contains(text(), 'test2')]")).size(), 0);

		deleteDataSources(driver);
		driver.quit();
	}

	@Test
	public void dataSourceDeleteTest() throws InterruptedException {
		WebDriver driver = getDriver();
		createDataSource(driver);

		WebElement table = driver.findElement(By.className("table"));

		// checks first row in table has name 'test1'
		WebElement tb = table.findElement(By.tagName("tbody"));
		WebElement tr = tb.findElement(By.className("accordion-toggle"));
		tr.click();
		Thread.sleep(threadSleep);

		WebElement hiddenRow = tb.findElement(By.className("accordian-body"));
		WebElement buttonGroup = hiddenRow.findElement(By.className("btn-group"));
		WebElement deleteButton = buttonGroup.findElements(By.tagName("button")).get(2);

		deleteButton.click();
		Thread.sleep(threadSleep);

		WebElement dialog = driver.findElement(By.className("modal-content"));
		WebElement deleteButton2 = dialog.findElements(By.className("btn")).get(1);
		deleteButton2.click();
		Thread.sleep(threadSleep);

		Assert.assertEquals(table.findElements(By.xpath("//*[contains(text(), 'test1')]")).size(), 0);

		deleteDataSources(driver);
		driver.quit();
	}

	@Test
	public void dataSourceDeleteCancelTest() throws InterruptedException {
		WebDriver driver = getDriver();
		createDataSource(driver);

		WebElement table = driver.findElement(By.className("table"));

		// checks first row in table has name 'test1'
		WebElement tb = table.findElement(By.tagName("tbody"));
		WebElement tr = tb.findElement(By.className("accordion-toggle"));
		tr.click();
		Thread.sleep(threadSleep);

		WebElement hiddenRow = tb.findElement(By.className("accordian-body"));
		WebElement buttonGroup = hiddenRow.findElement(By.className("btn-group"));
		WebElement deleteButton = buttonGroup.findElements(By.tagName("button")).get(2);

		deleteButton.click();
		Thread.sleep(threadSleep);

		WebElement dialog = driver.findElement(By.className("modal-content"));
		WebElement cancelButton = dialog.findElements(By.className("btn")).get(0);
		cancelButton.click();
		Thread.sleep(threadSleep);

		table.findElement(By.xpath("//*[contains(text(), 'test1')]"));

		tr.click();
		Thread.sleep(threadSleep);

		deleteDataSources(driver);
		driver.quit();
	}

}