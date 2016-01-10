package test;

import java.util.List;

import org.junit.Assert;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class DataSourceTest {

	private static String name1 = "test1";
	private static String name2 = "test2";

	private WebDriver getDriver() {
		System.setProperty("webdriver.chrome.driver",
				"c://Users//Jerry Cheng//Desktop//uni//FYDP//reporta//test//lib//chromedriver.exe");

		ChromeOptions options = new ChromeOptions();
		System.setProperty("webdriver.chrome.args", "--disable-logging");
		System.setProperty("webdriver.chrome.silentOutput", "true");
		WebDriver driver = new ChromeDriver(options);

		String url = "localhost:8080";
		driver.get(url);

		WebElement dataSourceButton = driver.findElement(By.id("data_sources"));
		Assert.assertNotNull(dataSourceButton);
		dataSourceButton.click();

		return driver;
	}

	private void createDataSource(WebDriver driver) throws InterruptedException {
		WebElement newDataSourceButton = driver.findElement(By.xpath("//*[contains(text(), 'New Data Source')]"));

		newDataSourceButton.click();

		WebElement dialog = driver.findElement(By.className("modal-content"));

		WebElement modalBody = dialog.findElement(By.className("modal-body"));

		WebElement nameTextField = modalBody.findElement(By.tagName("input"));
		nameTextField.sendKeys(name1);

		WebElement dropDown = modalBody.findElement(By.className("dropdown-menu"));
		// TODO: populate dropdown menu

		WebElement modalFooter = dialog.findElement(By.className("modal-footer"));

		WebElement newDataSourceSaveButton = modalFooter.findElement(By.xpath("//*[contains(text(), 'Save')]"));
		newDataSourceSaveButton.click();
		Thread.sleep(2000);
	}

	private void deleteDataSources(WebDriver driver) throws InterruptedException {
		WebElement table = driver.findElement(By.className("table"));

		// checks first row in table has name 'test1'
		List<WebElement> trs = table.findElements(By.className("accordion-toggle"));

		for (WebElement tr : trs) {
			tr.click();

			WebElement deleteButton = tr.findElement(By.xpath("//*[contains(text(), 'Delete')]"));
			deleteButton.click();

			WebElement dialog = driver.findElement(By.className("modal-content"));

			WebElement deleteButton2 = dialog.findElement(By.xpath("//*[contains(text(), 'Delete')]"));
			deleteButton2.click();

			Thread.sleep(2000);
		}

	}

	// @Test
	public void pageTitleTest() {
		WebDriver driver = getDriver();

		String pageTitle = driver.getTitle();
		Assert.assertEquals(pageTitle, "Reporta");

		driver.quit();
	}

	// @Test
	public void frameTitleTest() {
		WebDriver driver = getDriver();

		WebElement title = driver.findElement(By.tagName("h2"));
		Assert.assertEquals(title.getText(), "Data Sources");

		driver.quit();
	}

	// @Test
	public void viewContainerTest() {
		WebDriver driver = getDriver();

		WebElement viewContainer = driver.findElement(By.id("viewContainer"));
		Assert.assertNotNull(viewContainer);

		driver.quit();
	}

	// @Test
	public void newDataSourceButtonTest() {
		WebDriver driver = getDriver();

		WebElement newDataSourceButton = driver.findElement(By.xpath("//*[contains(text(), 'New Data Source')]"));

		// WebElement newDataSourceButton = driver
		// .findElement(By. By.className("btn"));
		Assert.assertNotNull(newDataSourceButton);

		driver.quit();
	}

	// @Test
	public void newDataSourceDialogTest() {
		WebDriver driver = getDriver();

		WebElement newDataSourceButton = driver.findElement(By.xpath("//*[contains(text(), 'New Data Source')]"));

		newDataSourceButton.click();

		WebElement dialog = driver.findElement(By.className("modal-content"));
		Assert.assertNotNull(dialog);

		WebElement modalHeader = dialog.findElement(By.className("modal-header"));
		Assert.assertNotNull(modalHeader);

		WebElement dialogTitle = modalHeader.findElement(By.xpath("//*[contains(text(), 'Create Data Source')]"));
		Assert.assertNotNull(dialogTitle);

		WebElement modalBody = dialog.findElement(By.className("modal-body"));
		Assert.assertNotNull(modalBody);

		WebElement nameLabel = modalBody.findElement(By.xpath("//*[contains(text(), 'Name:')]"));
		Assert.assertNotNull(nameLabel);

		WebElement nameTextField = modalBody.findElement(By.tagName("input"));
		Assert.assertNotNull(nameTextField);
		Assert.assertEquals(nameTextField.getText(), "");

		WebElement systemLabel = modalBody.findElement(By.xpath("//*[contains(text(), 'System:')]"));
		Assert.assertNotNull(systemLabel);

		WebElement dropDown = modalBody.findElement(By.className("dropdown-menu"));
		Assert.assertNotNull(dropDown);

		WebElement modalFooter = dialog.findElement(By.className("modal-footer"));
		Assert.assertNotNull(modalFooter);

		WebElement newDataSourceSaveButton = modalFooter.findElement(By.xpath("//*[contains(text(), 'Save')]"));
		Assert.assertNotNull(newDataSourceSaveButton);

		WebElement newDataSourceCancelButton = modalFooter.findElement(By.xpath("//*[contains(text(), 'Cancel')]"));
		Assert.assertNotNull(newDataSourceCancelButton);

		driver.quit();
	}

	// @Test
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
	public void dataSourceEditTest() throws InterruptedException {
		// runs after new data source test has completed
		WebDriver driver = getDriver();
		createDataSource(driver);

		WebElement table = driver.findElement(By.className("table"));

		// checks first row in table has name 'test1'
		List<WebElement> tbs = table.findElements(By.tagName("tbody"));
		List<WebElement> trs = tbs.get(0).findElements(By.className("accordion-toggle"));
		trs.get(0).click();
		Thread.sleep(2000);
		
		WebElement hiddenRow = tbs.get(0).findElement(By.className("accordian-body"));
		WebElement buttonGroup = hiddenRow.findElement(By.className("btn-group"));
		WebElement editButton = buttonGroup.findElements(By.tagName("button")).get(0);
		Assert.assertNotNull(editButton);

		// click doesn't work
		editButton.sendKeys(Keys.ENTER);
		Thread.sleep(2000);

		driver.quit();
	}

	@Test
	public void dataSourceCloneTest() {

	}

	@Test
	public void dataSourceDeleteTest() {

	}

}