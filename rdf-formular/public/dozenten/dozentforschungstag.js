document.addEventListener("DOMContentLoaded", function() {
  erstelleDFTagTabelle();
});

function erstelleDFTagTabelle() {
  const tableDiv = document.getElementById("dfTagTabelle");
  tableDiv.innerHTML = `
    <table border="1" style="border-collapse:collapse; text-align:center; width:100%;">
      <tr>
        <th>Tag ist egal</th>
        <th>Montag</th>
        <th>Dienstag</th>
        <th>Mittwoch</th>
        <th>Donnerstag</th>
        <th>Freitag</th>
      </tr>
      <tr>
        <td>
          <label><input type="checkbox" name="df_tag_egal_D" value="D"> D</label>
          <label><input type="checkbox" name="df_tag_egal_F" value="F"> F</label>
        </td>
        <td>
          <label><input type="checkbox" name="df_mo_D" value="D"> D</label>
          <label><input type="checkbox" name="df_mo_F" value="F"> F</label>
        </td>
        <td>
          <label><input type="checkbox" name="df_di_D" value="D"> D</label>
          <label><input type="checkbox" name="df_di_F" value="F"> F</label>
        </td>
        <td>
          <label><input type="checkbox" name="df_mi_D" value="D"> D</label>
          <label><input type="checkbox" name="df_mi_F" value="F"> F</label>
        </td>
        <td>
          <label><input type="checkbox" name="df_do_D" value="D"> D</label>
          <label><input type="checkbox" name="df_do_F" value="F"> F</label>
        </td>
        <td>
          <label><input type="checkbox" name="df_fr_D" value="D"> D</label>
          <label><input type="checkbox" name="df_fr_F" value="F"> F</label>
        </td>
      </tr>
      <tr style="background:#f8fff8;">
        <td>
          <label><input type="checkbox" name="df_not_egal_D" value="D"> D</label>
          <label><input type="checkbox" name="df_not_egal_F" value="F"> F</label>
        </td>
        <td>
          <label><input type="checkbox" name="df_not_mo_D" value="D"> D</label>
          <label><input type="checkbox" name="df_not_mo_F" value="F"> F</label>
        </td>
        <td>
          <label><input type="checkbox" name="df_not_di_D" value="D"> D</label>
          <label><input type="checkbox" name="df_not_di_F" value="F"> F</label>
        </td>
        <td>
          <label><input type="checkbox" name="df_not_mi_D" value="D"> D</label>
          <label><input type="checkbox" name="df_not_mi_F" value="F"> F</label>
        </td>
        <td>
          <label><input type="checkbox" name="df_not_do_D" value="D"> D</label>
          <label><input type="checkbox" name="df_not_do_F" value="F"> F</label>
        </td>
        <td>
          <label><input type="checkbox" name="df_not_fr_D" value="D"> D</label>
          <label><input type="checkbox" name="df_not_fr_F" value="F"> F</label>
        </td>
      </tr>
    </table>
  `;
}
